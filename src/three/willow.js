// Der One Wish Willow in 3D: drehbar, gedrückt halten zum Zerbrechen.
import * as THREE from 'three';

const L = 6.2; // Länge
const R = 0.46; // Radius des Prismas

/** Verpackungs-Textur, nachempfunden der Requisite aus dem Film. */
function paperTexture() {
  const W = 2048;
  const B = 288; // Höhe pro Seite
  const H = B * 3;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d');
  const red = '#c3132d';
  const cream = '#f2e7d2';
  const disp = '"Fira Sans Extra Condensed", "Arial Narrow", sans-serif';

  g.fillStyle = cream;
  g.fillRect(0, 0, W, H);
  // Papierstruktur
  const id = g.getImageData(0, 0, W, H);
  for (let i = 0; i < id.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    id.data[i] += n;
    id.data[i + 1] += n;
    id.data[i + 2] += n;
  }
  g.putImageData(id, 0, 0);

  // Seite 1: Logo
  let y = 0;
  g.fillStyle = red;
  g.fillRect(0, y + 16, W, 10);
  g.fillRect(0, y + B - 26, W, 10);
  g.save();
  g.translate(W * 0.27, y + B / 2 + 6);
  g.rotate(-0.07);
  g.font = `italic 900 150px ${disp}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.lineWidth = 14;
  g.strokeStyle = '#fff';
  g.strokeText('ONE WISH WILLOW', 0, 0);
  g.fillStyle = red;
  g.fillText('ONE WISH WILLOW', 0, 0);
  g.restore();
  // kleine Sterne
  g.fillStyle = red;
  for (let i = 0; i < 9; i += 1) {
    const sx = 40 + Math.random() * 120;
    const sy = y + 50 + Math.random() * (B - 100);
    g.beginPath();
    g.arc(sx, sy, 3 + Math.random() * 5, 0, Math.PI * 2);
    g.fill();
  }
  // Badge rechts
  g.save();
  g.translate(W * 0.78, y + B / 2);
  g.rotate(0.05);
  g.fillStyle = red;
  g.beginPath();
  g.roundRect(-210, -80, 420, 160, 26);
  g.fill();
  g.fillStyle = cream;
  g.font = `900 66px ${disp}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('AMAZE YOUR', 0, -30);
  g.fillText('FRIENDS!', 0, 36);
  g.restore();

  // Seite 2: Streifen + Slogan
  y = B;
  g.save();
  g.beginPath();
  g.rect(0, y, W, B);
  g.clip();
  g.fillStyle = red;
  for (let x = -B; x < W + B; x += 70) {
    g.beginPath();
    g.moveTo(x, y);
    g.lineTo(x + 34, y);
    g.lineTo(x + 34 + B, y + B);
    g.lineTo(x + B, y + B);
    g.fill();
  }
  g.restore();
  g.fillStyle = cream;
  g.fillRect(W * 0.12, y + B * 0.28, W * 0.76, B * 0.44);
  g.fillStyle = red;
  g.font = `900 104px ${disp}`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText('YOU ONLY GET ONE WISH', W / 2, y + B / 2 + 4);

  // Seite 3: Anleitung + Kleingedrucktes
  y = B * 2;
  g.fillStyle = red;
  g.fillRect(0, y + 16, W, 6);
  g.fillRect(0, y + B - 22, W, 6);
  g.font = `900 70px ${disp}`;
  g.textAlign = 'left';
  g.textBaseline = 'middle';
  g.fillText('1. SNAP IN HALF', 70, y + B * 0.36);
  g.fillText('2. MAKE A WISH', 70, y + B * 0.66);
  g.textAlign = 'right';
  g.font = `600 30px ${disp}`;
  g.fillText('CUSTOMER SERVICE: 1-800-ONE-WISH', W - 60, y + B * 0.36);
  g.fillText('WISH EXPIRES UPON DEATH OF THE WISHER. NO REFUNDS.', W - 60, y + B * 0.62);

  // Bruchlinie in der Mitte
  g.strokeStyle = red;
  g.lineWidth = 6;
  g.setLineDash([18, 14]);
  g.beginPath();
  g.moveTo(W / 2, 0);
  g.lineTo(W / 2, H);
  g.stroke();
  g.setLineDash([]);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Hälfte eines dreiseitigen Prismas von x0 bis x1, UVs global über die Länge. */
function prismHalf(x0, x1) {
  const ang = [Math.PI / 2, Math.PI / 2 + (2 * Math.PI) / 3, Math.PI / 2 + (4 * Math.PI) / 3];
  const pts = ang.map((a) => [Math.cos(a) * R, Math.sin(a) * R]);
  const pos = [];
  const uv = [];
  const nor = [];
  const u0 = (x0 + L / 2) / L;
  const u1 = (x1 + L / 2) / L;
  for (let f = 0; f < 3; f += 1) {
    const [ay, az] = pts[f];
    const [by, bz] = pts[(f + 1) % 3];
    const n = new THREE.Vector3(0, (ay + by) / 2, (az + bz) / 2).normalize();
    const band = [1, 2, 0][f]; // Logo auf der oberen Vorderseite
    const v0 = 1 - band / 3;
    const v1 = 1 - (band + 1) / 3;
    const quad = [
      [x0, ay, az, u0, v0],
      [x1, by, bz, u1, v1],
      [x1, ay, az, u1, v0],
      [x0, ay, az, u0, v0],
      [x0, by, bz, u0, v1],
      [x1, by, bz, u1, v1],
    ];
    quad.forEach(([x, yy, z, uu, vv]) => {
      pos.push(x, yy, z);
      uv.push(uu, vv);
      nor.push(n.x, n.y, n.z);
    });
  }
  // Endkappen
  [
    [x0, -1],
    [x1, 1],
  ].forEach(([x, s]) => {
    const tri = s > 0 ? [0, 1, 2] : [0, 2, 1];
    tri.forEach((i) => {
      pos.push(x, pts[i][0], pts[i][1]);
      uv.push(0.001, 0.001);
      nor.push(s, 0, 0);
    });
  });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  return geo;
}

export async function createWillow(container) {
  try {
    await document.fonts.load('italic 900 100px "Fira Sans Extra Condensed"');
    await document.fonts.load('900 100px "Fira Sans Extra Condensed"');
  } catch {
    /* Fallback-Schrift */
  }
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.4, 11.5);

  scene.add(new THREE.AmbientLight(0xffffff, 0.25));
  const key = new THREE.SpotLight(0xfff1dc, 60, 30, 0.55, 0.6);
  key.position.set(2, 6, 7);
  scene.add(key);
  const rim = new THREE.PointLight(0xff1a3c, 40, 20);
  rim.position.set(-3, -1, -4);
  scene.add(rim);
  const fill = new THREE.PointLight(0x4f7dff, 14, 20);
  fill.position.set(-6, 2, 3);
  scene.add(fill);
  const flash = new THREE.PointLight(0xffffff, 0, 12);
  flash.position.set(0, 0, 2);
  scene.add(flash);

  const tex = paperTexture();
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, metalness: 0.02, flatShading: true });
  const capMat = new THREE.MeshStandardMaterial({ color: 0xe9dcc4, roughness: 0.8 });
  const groups = [];
  const root = new THREE.Group();
  scene.add(root);
  [
    [-L / 2, 0],
    [0, L / 2],
  ].forEach(([a, b], i) => {
    const pivot = new THREE.Group();
    const mesh = new THREE.Mesh(prismHalf(a, b), [mat, capMat]);
    mesh.geometry.addGroup(0, 18, 0);
    mesh.geometry.addGroup(18, 6, 1);
    pivot.add(mesh);
    root.add(pivot);
    groups.push({ pivot, mesh, side: i === 0 ? -1 : 1 });
  });

  // Staub
  const N = 420;
  const dust = new THREE.BufferGeometry();
  const dp = new Float32Array(N * 3);
  for (let i = 0; i < N; i += 1) {
    dp[i * 3] = (Math.random() - 0.5) * 18;
    dp[i * 3 + 1] = (Math.random() - 0.5) * 10;
    dp[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
  }
  dust.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dustPts = new THREE.Points(dust, new THREE.PointsMaterial({ color: 0xffd2b8, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false }));
  scene.add(dustPts);

  // Funken beim Zerbrechen
  const S = 260;
  const sparkGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(S * 3);
  const sv = [];
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const sparkMat = new THREE.PointsMaterial({ color: 0xff3350, size: 0.07, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparks);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    camera.position.z = w / h < 1.2 ? 15 : 11.5;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  // Steuerung
  let rotY = -0.35;
  let rotX = 0.25;
  let velY = 0.004;
  let velX = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let hold = 0;
  let holding = false;
  let broken = false;
  let breakT = 0;
  let shake = 0;
  let visible = true;
  const cbs = { progress: () => {}, broken: () => {} };

  const el = renderer.domElement;
  el.style.touchAction = 'none';
  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    if (!broken) holding = true;
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    velY = (e.clientX - lastX) * 0.004;
    velX = (e.clientY - lastY) * 0.003;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  const up = () => {
    dragging = false;
    holding = false;
  };
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);

  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
  io.observe(container);

  function doBreak() {
    broken = true;
    breakT = 0;
    shake = 1;
    flash.intensity = 80;
    for (let i = 0; i < S; i += 1) {
      sp[i * 3] = (Math.random() - 0.5) * 0.3;
      sp[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      sp[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      const a = Math.random() * Math.PI * 2;
      const b = Math.random() * Math.PI - Math.PI / 2;
      const s = 0.04 + Math.random() * 0.14;
      sv[i] = [Math.cos(a) * Math.cos(b) * s, Math.sin(b) * s + 0.03, Math.sin(a) * Math.cos(b) * s];
    }
    sparkGeo.attributes.position.needsUpdate = true;
    sparkMat.opacity = 1;
    cbs.broken();
  }

  const clock = new THREE.Clock();
  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;

    if (!dragging) {
      velY += (0.0035 - velY) * 0.02;
      velX *= 0.94;
      rotX += (0.22 - rotX) * 0.02;
    }
    rotY += velY;
    rotX += velX;
    rotX = Math.max(-0.9, Math.min(0.9, rotX));

    if (holding && !broken) {
      hold = Math.min(1, hold + dt / 1.4);
      if (hold >= 1) doBreak();
    } else if (!broken) {
      hold = Math.max(0, hold - dt * 1.6);
    }
    cbs.progress(hold);

    root.rotation.set(rotX, rotY, 0);
    root.position.y = Math.sin(time * 1.1) * 0.12;

    const tremble = hold * hold * 0.04;
    groups.forEach(({ pivot, side }) => {
      if (!broken) {
        pivot.rotation.z = -side * hold * 0.22 + (Math.random() - 0.5) * tremble;
        pivot.position.set((Math.random() - 0.5) * tremble, (Math.random() - 0.5) * tremble, 0);
      } else {
        breakT = Math.min(1, breakT + dt * 0.9);
        const e = 1 - (1 - breakT) ** 3;
        pivot.position.set(side * e * 1.6, -e * 0.4 + Math.sin(time * 1.4 + side) * 0.05 * e, side * e * 0.6);
        pivot.rotation.z = -side * (0.22 + e * 0.55);
        pivot.rotation.y = side * e * 0.5;
      }
    });

    if (sparkMat.opacity > 0) {
      for (let i = 0; i < S; i += 1) {
        sp[i * 3] += sv[i][0];
        sp[i * 3 + 1] += sv[i][1];
        sp[i * 3 + 2] += sv[i][2];
        sv[i][1] -= 0.0025;
        sv[i][0] *= 0.985;
        sv[i][2] *= 0.985;
      }
      sparkGeo.attributes.position.needsUpdate = true;
      sparkMat.opacity = Math.max(0, sparkMat.opacity - dt * 0.55);
    }
    flash.intensity *= 0.9;
    rim.intensity = 40 + hold * 120 + Math.sin(time * 3) * 4;

    shake *= 0.9;
    camera.position.x = (Math.random() - 0.5) * shake * 0.25;
    camera.position.y = 0.4 + (Math.random() - 0.5) * shake * 0.25;
    camera.lookAt(0, 0, 0);

    dustPts.rotation.y = time * 0.02;
    renderer.render(scene, camera);
  };
  loop();

  return {
    onProgress: (fn) => (cbs.progress = fn),
    onBroken: (fn) => (cbs.broken = fn),
    reset() {
      broken = false;
      hold = 0;
      breakT = 0;
      groups.forEach(({ pivot }) => {
        pivot.position.set(0, 0, 0);
        pivot.rotation.set(0, 0, 0);
      });
    },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      renderer.dispose();
    },
  };
}
