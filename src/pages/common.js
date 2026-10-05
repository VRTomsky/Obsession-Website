// Gemeinsamer Start für alle Seiten: Schriften, Styles, Layout, Scrolling, Cursor.
import '@fontsource/fira-sans-extra-condensed/700.css';
import '@fontsource/fira-sans-extra-condensed/800.css';
import '@fontsource/fira-sans-extra-condensed/900.css';
import '@fontsource/fira-sans-extra-condensed/900-italic.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import '../styles/base.css';
import '../styles/layout.css';
import '../styles/sections.css';
import '../styles/profile.css';

import { initLayout } from '../core/layout.js';
import { initScroll } from '../core/scroll.js';

export function boot({ footer = true } = {}) {
  initLayout({ footer });
  initScroll();
}

export const fontsReady = () =>
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
