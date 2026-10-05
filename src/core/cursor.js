// Eigener Cursor: Punkt + Ring, der bei Links wächst und Labels („Öffnen", „Ziehen") zeigt.
import { gsap } from 'gsap';

export function initCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
  const node = document.createElement('div');
  node.className = 'cursor';
  node.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div><div class="cursor__label"></div>';
  document.body.appendChild(node);
  document.documentElement.classList.add('has-cursor');

  const dot = node.querySelector('.cursor__dot');
  const ring = node.querySelector('.cursor__ring');
  const label = node.querySelector('.cursor__label');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.08 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
  const lx = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3' });
  const ly = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3' });

  window.addEventListener('pointermove', (e) => {
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
    lx(e.clientX);
    ly(e.clientY);
  });

  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor], a, button, input, label');
    node.classList.remove('is-hover', 'is-label');
    if (!t) return;
    const text = t.getAttribute('data-cursor');
    if (text) {
      label.textContent = text;
      node.classList.add('is-label');
    } else {
      node.classList.add('is-hover');
    }
  });

  document.addEventListener('pointerleave', () => gsap.to(node, { opacity: 0, duration: 0.3 }));
  document.addEventListener('pointerenter', () => gsap.to(node, { opacity: 1, duration: 0.3 }));
}
