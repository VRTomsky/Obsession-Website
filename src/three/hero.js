// Interaktives Hero-Video: WebGL-Shader mit Maus-Linse, chromatischer Aberration (wie im Filmlogo),
// Filmkorn und scroll-gesteuerter Unschärfe/Abdunklung.
import * as THREE from 'three';

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uVid;
uniform vec2 uMouse;
uniform float uVel;
uniform float uTime;
uniform float uProgress;
uniform float uIntro;
uniform float uGlitch;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec2 cover(vec2 uv) {
  float rs = uRes.x / uRes.y;
  float rv = uVid.x / uVid.y;
  vec2 s = rs > rv ? vec2(1.0, rv / rs) : vec2(rs / rv, 1.0);
  return (uv - 0.5) * s + 0.5;
}

vec3 sampleRGB(vec2 uv, vec2 dir, float ca) {
  float r = texture2D(uTex, cover(uv + dir * ca)).r;
  float g = texture2D(uTex, cover(uv)).g;
  float b = texture2D(uTex, cover(uv - dir * ca)).b;
  return vec3(r, g, b);
}

void main() {
  vec2 uv = vUv;
  uv = (uv - 0.5) / (1.0 + uProgress * 0.14) + 0.5;

  // Glitch-Streifen beim Gedrückthalten
  float band = step(0.985 - uGlitch * 0.12, hash(vec2(floor(uv.y * 60.0), floor(uTime * 18.0))));
  uv.x += band * (hash(vec2(uTime, uv.y)) - 0.5) * 0.08 * uGlitch;

  // Linse um die Maus
  vec2 d = uv - uMouse;
  d.x *= uRes.x / uRes.y;
  float dist = length(d);
  float lens = smoothstep(0.42, 0.0, dist);
  uv -= normalize(d + 1e-5) * lens * (0.01 + uVel * 0.05);

  // leichtes Atmen
  uv.x += sin(uv.y * 16.0 + uTime * 1.3) * 0.0012 * (1.0 + uVel * 8.0 + uGlitch * 6.0);

  vec2 dir = vUv - 0.5;
  float ca = 0.0022 + uVel * 0.022 + uProgress * 0.008 + lens * 0.005 + uGlitch * 0.02;

  vec3 col;
  float br = uProgress * 0.014;
  if (br < 0.0006) {
    col = sampleRGB(uv, dir, ca);
  } else {
    col = vec3(0.0);
    for (int i = 0; i < 12; i++) {
      float a = float(i) * 2.39996;
      float r = sqrt((float(i) + 0.5) / 12.0) * br;
      col += sampleRGB(uv + vec2(cos(a), sin(a)) * r, dir, ca);
    }
    col /= 12.0;
  }

  // Farbstimmung: leicht rötlich, tiefe Schwarztöne
  col = mix(col, col * vec3(1.1, 0.9, 0.92), 0.4);
  col = pow(col, vec3(1.06));

  float vig = smoothstep(1.25, 0.2, length((vUv - 0.5) * vec2(1.25, 1.0)) * 1.55);
  col *= mix(0.45, 1.05, vig);
  col *= mix(1.0, 0.16, uProgress);
  col *= 0.975 + 0.025 * sin(uTime * 41.0) * hash(vec2(floor(uTime * 24.0)));
  col += (hash(vUv * uRes + fract(uTime) * 91.0) - 0.5) * 0.065;
  col += vec3(0.55, 0.03, 0.08) * band * uGlitch * 0.5;
  col *= uIntro;
  gl_FragColor = vec4(col, 1.0);
}`;

export function createHeroGL(container, video) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const tex = new THREE.VideoTexture(video);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;

  const uniforms = {
    uTex: { value: tex },
    uRes: { value: new THREE.Vector2(1, 1) },
    uVid: { value: new THREE.Vector2(1620, 1080) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uVel: { value: 0 },
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uIntro: { value: 0 },
    uGlitch: { value: 0 },
  };
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms }));
  scene.add(mesh);

  const target = { x: 0.5, y: 0.5 };
  const cur = { x: 0.5, y: 0.5 };
  let vel = 0;
  let glitchTarget = 0;
  let visible = true;
  let raf = 0;

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    uniforms.uRes.value.set(w, h);
  };
  resize();
  window.addEventListener('resize', resize);

  video.addEventListener('loadedmetadata', () => uniforms.uVid.value.set(video.videoWidth || 1620, video.videoHeight || 1080));

  const onMove = (e) => {
    const r = container.getBoundingClientRect();
    target.x = (e.clientX - r.left) / r.width;
    target.y = 1 - (e.clientY - r.top) / r.height;
  };
  window.addEventListener('pointermove', onMove);

  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
  io.observe(container);

  const clock = new THREE.Clock();
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const px = cur.x;
    const py = cur.y;
    cur.x += (target.x - cur.x) * 0.08;
    cur.y += (target.y - cur.y) * 0.08;
    const v = Math.hypot(cur.x - px, cur.y - py) / Math.max(dt, 0.001);
    vel += (Math.min(v * 0.6, 1) - vel) * 0.1;
    uniforms.uMouse.value.set(cur.x, cur.y);
    uniforms.uVel.value = vel;
    uniforms.uTime.value += dt;
    uniforms.uGlitch.value += (glitchTarget - uniforms.uGlitch.value) * 0.12;
    renderer.render(scene, camera);
  };
  loop();

  return {
    uniforms,
    setProgress: (p) => (uniforms.uProgress.value = p),
    setGlitch: (g) => (glitchTarget = g),
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
    },
  };
}
