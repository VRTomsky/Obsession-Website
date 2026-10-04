"""Download and optimise the media listed in tools/assets/manifest.json.

Runs inside the "Fetch media assets" GitHub Actions workflow, because the
development container has no direct access to the image/video hosts.

manifest.json
  images: [{url, out, max?, quality?, force?}]
      out extension decides the format (.webp / .jpg / .png)
  videos: [{id, sources: [url, ...], sheet?: bool, clips: [{start, duration, out, width?}]}]
      out is a path without extension; .mp4, .webm and .jpg (poster) are written
"""

import io
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "tools/assets/manifest.json"
PREVIEW = ROOT / "tools/assets/preview"
REPORT = ROOT / "tools/assets/report.json"
UA = "ObsessionFanSite/1.0 (https://github.com/VRTomsky/Obsession-Website; fan project)"
TMP = Path("/tmp/obsession-assets")

report = {"images": {"ok": [], "skipped": [], "failed": []}, "videos": {}}


def save_image(img, out, quality):
    out.parent.mkdir(parents=True, exist_ok=True)
    ext = out.suffix.lower()
    if ext == ".jpg" or ext == ".jpeg":
        img.convert("RGB").save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    elif ext == ".png":
        img.save(out, "PNG", optimize=True)
    elif ext == ".webp":
        img.save(out, "WEBP", quality=quality, method=6)
    else:
        raise ValueError(f"unknown extension {ext}")


def fetch_images(items):
    session = requests.Session()
    session.headers["User-Agent"] = UA
    for item in items:
        out = ROOT / item["out"]
        if out.exists() and not item.get("force"):
            report["images"]["skipped"].append(item["out"])
            continue
        try:
            r = session.get(item["url"], timeout=60)
            r.raise_for_status()
            img = Image.open(io.BytesIO(r.content))
            img.load()
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA" if "transparency" in img.info or img.mode in ("LA", "P") else "RGB")
            max_w = item.get("max")
            if max_w and img.width > max_w:
                img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
            save_image(img, out, item.get("quality", 82))
            report["images"]["ok"].append({"out": item["out"], "size": [img.width, img.height]})
            print("ok  ", item["out"], img.size)
        except Exception as exc:  # noqa: BLE001 - report and continue
            report["images"]["failed"].append({"out": item["out"], "url": item["url"], "error": str(exc)})
            print("FAIL", item["out"], exc, file=sys.stderr)


def run(cmd):
    print("$", " ".join(cmd))
    return subprocess.run(cmd, capture_output=True, text=True)


def download_video(vid):
    target = TMP / f"{vid['id']}.mp4"
    if target.exists():
        return target, "cached"
    TMP.mkdir(parents=True, exist_ok=True)
    clients = ["default", "tv_simply", "tv", "web_safari", "mweb", "android_vr", "ios"]
    errors = []
    for source in vid["sources"]:
        if ".mp4" in source.split("?")[0]:
            try:
                with requests.get(source, stream=True, timeout=120, headers={"User-Agent": UA}) as r:
                    r.raise_for_status()
                    with open(target, "wb") as fh:
                        for chunk in r.iter_content(1 << 20):
                            fh.write(chunk)
                return target, source.split("?")[0]
            except Exception as exc:  # noqa: BLE001
                errors.append(f"{source.split('?')[0]}: {exc}")
                continue
        attempts = clients if "youtu" in source else ["default"]
        for client in attempts:
            cmd = [
                "yt-dlp", "--no-playlist", "--no-progress",
                "-f", "bv*[height<=1080][ext=mp4]+ba[ext=m4a]/bv*[height<=1080]+ba/b[height<=1080]/b",
                "--merge-output-format", "mp4",
                "-o", str(target), source,
            ]
            if client != "default":
                cmd[1:1] = ["--extractor-args", f"youtube:player_client={client}"]
            res = run(cmd)
            if res.returncode == 0 and target.exists():
                return target, f"{source} ({client})"
            errors.append(f"{source} [{client}]: {res.stderr.strip()[-400:]}")
    raise RuntimeError("\n".join(errors))


def contact_sheet(video, vid_id, fps=1.0):
    frames = TMP / f"{vid_id}-frames"
    shutil.rmtree(frames, ignore_errors=True)
    frames.mkdir(parents=True)
    run(["ffmpeg", "-loglevel", "error", "-i", str(video), "-vf", f"fps={fps},scale=320:-2", str(frames / "%04d.jpg")])
    files = sorted(frames.glob("*.jpg"))
    if not files:
        return []
    PREVIEW.mkdir(parents=True, exist_ok=True)
    cols, rows = 8, 6
    per_sheet = cols * rows
    font = ImageFont.load_default()
    outs = []
    w, h = Image.open(files[0]).size
    for s in range(0, len(files), per_sheet):
        chunk = files[s:s + per_sheet]
        sheet = Image.new("RGB", (cols * w, rows * (h + 16)), "black")
        draw = ImageDraw.Draw(sheet)
        for i, f in enumerate(chunk):
            x, y = (i % cols) * w, (i // cols) * (h + 16)
            sheet.paste(Image.open(f), (x, y + 16))
            draw.text((x + 4, y + 2), f"{(s + i) / fps:.0f}s", fill="yellow", font=font)
        out = PREVIEW / f"{vid_id}-sheet-{s // per_sheet + 1}.jpg"
        sheet.save(out, "JPEG", quality=80)
        outs.append(str(out.relative_to(ROOT)))
    return outs


def make_clip(video, clip):
    out = ROOT / clip["out"]
    out.parent.mkdir(parents=True, exist_ok=True)
    width = clip.get("width", 1920)
    vf = f"scale={width}:-2:flags=lanczos,fps=30"
    base = ["ffmpeg", "-y", "-loglevel", "error", "-ss", str(clip["start"]), "-t", str(clip["duration"]), "-i", str(video), "-an"]
    results = {}
    mp4 = out.with_suffix(".mp4")
    r1 = run(base + ["-vf", vf, "-c:v", "libx264", "-preset", "slow", "-crf", str(clip.get("crf", 23)),
                     "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4)])
    results["mp4"] = r1.returncode == 0
    webm = out.with_suffix(".webm")
    r2 = run(base + ["-vf", vf, "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1",
                     "-deadline", "good", "-cpu-used", "2", str(webm)])
    results["webm"] = r2.returncode == 0
    poster = out.with_suffix(".jpg")
    r3 = run(["ffmpeg", "-y", "-loglevel", "error", "-ss", str(clip["start"]), "-i", str(video), "-frames:v", "1",
              "-vf", f"scale={width}:-2", "-q:v", "3", str(poster)])
    results["poster"] = r3.returncode == 0
    for f in (mp4, webm, poster):
        if f.exists():
            results[f.suffix] = f.stat().st_size
    if r1.returncode or r2.returncode:
        results["error"] = (r1.stderr + r2.stderr)[-600:]
    return results


def fetch_videos(items):
    for vid in items:
        entry = {}
        try:
            video, source = download_video(vid)
            entry["source"] = source
            probe = run(["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=width,height",
                         "-of", "json", str(video)])
            entry["probe"] = json.loads(probe.stdout or "{}")
            if vid.get("sheet"):
                entry["sheets"] = contact_sheet(video, vid["id"], vid.get("sheet_fps", 1.0))
            entry["clips"] = {c["out"]: make_clip(video, c) for c in vid.get("clips", [])}
        except Exception as exc:  # noqa: BLE001
            entry["error"] = str(exc)[-3000:]
            print("VIDEO FAIL", vid["id"], exc, file=sys.stderr)
        report["videos"][vid["id"]] = entry


def main():
    manifest = json.loads(MANIFEST.read_text())
    fetch_images(manifest.get("images", []))
    fetch_videos(manifest.get("videos", []))
    REPORT.write_text(json.dumps(report, indent=2))
    print(json.dumps({k: (len(v) if isinstance(v, list) else v) for k, v in report["images"].items()}))


if __name__ == "__main__":
    main()
