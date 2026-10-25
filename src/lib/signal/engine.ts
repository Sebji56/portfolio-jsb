import type { City } from './cities.ts';
import { fitBox, graticule, isPortraitBackground, project, sampleOpaque } from './shapes.ts';
import { stages } from './timeline.ts';

interface Options {
  portraitSrc: string;
  cities: City[];
  locale: 'fr' | 'en';
  /** Progression brute 0..1 du défilement de la section. */
  getProgress: () => number;
  onFail: () => void;
  /** Mobile : ordonnée (dans le canvas) du haut du texte du héros, pour y poser le portrait. */
  fitAbove?: () => number;
}

type Pt = [number, number, number];
interface Particle { a: Pt; b: Pt; g: [number, number]; r: number; s: number; jx: number; jy: number }

function portraitPoints(img: HTMLImageElement): Pt[] {
  const s = 150, c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, s, s);
  const id = g.getImageData(0, 0, s, s), d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const l = (d[i] + d[i + 1] + d[i + 2]) / 3;
    d[i + 3] = isPortraitBackground(d[i], d[i + 1], d[i + 2]) ? 0 : 255;
    d[i] = Math.min(255, 40 + l * 1.1); // luminance → intensité de la particule
  }
  return sampleOpaque(d, s, s, 1);
}

function headsetPoints(): Pt[] {
  const w = 220, h = 130, c = document.createElement('canvas');
  c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.fillStyle = '#fff';
  g.beginPath(); g.roundRect(18, 26, 184, 86, 40); g.fill(); // visière
  g.fillRect(8, 56, 14, 22); g.fillRect(198, 56, 14, 22); // attaches
  g.beginPath(); g.roundRect(70, 4, 80, 18, 9); g.fill(); // sangle
  g.globalCompositeOperation = 'destination-out';
  for (const x of [62, 110, 158]) { g.beginPath(); g.roundRect(x - 9, 48, 18, 36, 9); g.fill(); } // caméras
  g.beginPath(); g.roundRect(30, 38, 160, 62, 30); g.lineWidth = 3; g.stroke();
  return sampleOpaque(g.getImageData(0, 0, w, h).data, w, h, 2);
}

/** Lance le récit en particules ; retourne la fonction d'arrêt. */
export function startSignal(canvas: HTMLCanvasElement, opts: Options): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) { opts.onFail(); return () => {}; }

  let raf = 0, visible = true, stopped = false, pS = 0, last = 0;
  let W = 0, H = 0, mobile = false, particles: Particle[] = [];
  let ink = '#d6e6ff', acc = '#4da3ff';
  const t0 = performance.now();

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    ink = cs.getPropertyValue('--particle').trim() || ink;
    acc = cs.getPropertyValue('--acc').trim() || acc;
  };
  let textTop = 0; // mesuré au redimensionnement, pas à chaque image
  const measure = () => { if (opts.fitAbove) textTop = opts.fitAbove(); };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight; mobile = W < 820;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    measure();
  };

  const frame = (now: number) => {
    raf = 0;
    if (stopped || !visible || document.hidden) { last = 0; return; }
    const dt = last ? Math.min((now - last) / 1000, 0.5) : 0;
    last = now;
    pS += (opts.getProgress() - pS) * (1 - Math.exp(-dt * 5.6)); // lissage fondé sur le temps : rattrape aussi à faible cadence
    const { m1, m2, lon0 } = stages(pS), time = (now - t0) / 1000;
    const pBox = mobile ? (textTop > 0 ? fitBox(W, 76, textTop - 14, 0.8) : { cx: W / 2, cy: H * 0.24, s: Math.min(W * 0.62, H * 0.32) }) : { cx: W * 0.7, cy: H * 0.52, s: Math.min(H * 0.82, W * 0.44) };
    const cBox = mobile ? { cx: W / 2, cy: H * 0.26 } : { cx: W * 0.66, cy: H * 0.5 };
    const hw = mobile ? W * 0.72 : Math.min(W * 0.46, 640);
    const R = mobile ? Math.min(W * 0.36, H * 0.19) : Math.min(W * 0.25, H * 0.36);
    const scatter = Math.sin(Math.PI * (m2 > 0 ? m2 : m1)) * (mobile ? 40 : 90);
    const size = mobile ? 1.3 : 1.6;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = ink;
    for (const q of particles) {
      const wob = Math.sin(time * q.s + q.r) * 1.2;
      const ax = pBox.cx + (q.a[0] - 0.5 + q.jx / 150) * pBox.s + wob, ay = pBox.cy + (q.a[1] - 0.5 + q.jy / 150) * pBox.s;
      const bx = cBox.cx + (q.b[0] - 0.5) * hw, by = cBox.cy + (q.b[1] - 0.5) * hw * (130 / 220) + wob;
      const p = project(q.g[0], q.g[1], lon0);
      let x = ax + (bx - ax) * m1, y = ay + (by - ay) * m1;
      x += (cBox.cx + R * p.x - x) * m2 + Math.cos(q.r) * scatter;
      y += (cBox.cy - R * p.y - y) * m2 + Math.sin(q.r) * scatter;
      let alpha = (0.12 + q.a[2] ** 1.6 * 0.95) * (1 - m1) + 0.8 * m1;
      if (m2 > 0) alpha = alpha * (1 - m2) + (p.z > 0 ? 0.25 + p.z * 0.55 : 0.05) * m2;
      ctx.globalAlpha = alpha;
      ctx.fillRect(x, y, q.s * size, q.s * size);
    }

    if (m2 > 0.6) {
      ctx.font = `600 ${mobile ? 11 : 13}px "Schibsted Grotesk Variable", system-ui, sans-serif`;
      for (const c of opts.cities) {
        const p = project(c.lat, c.lon, lon0);
        if (p.z < 0.08) continue;
        const x = cBox.cx + R * p.x, y = cBox.cy - R * p.y;
        const a = Math.min(1, (m2 - 0.6) / 0.4) * Math.min(1, p.z * 3), pulse = (time * 0.8 + c.lat) % 1;
        ctx.globalAlpha = a * (1 - pulse) * 0.7; ctx.strokeStyle = acc; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 16, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = a; ctx.fillStyle = acc;
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, Math.PI * 2); ctx.fill();
        if (c.label === 'always' || (c.label === 'desktop' && !mobile)) { ctx.fillStyle = ink; ctx.fillText(c.name[opts.locale], x + 9, y + 4); }
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && !stopped) raf = requestAnimationFrame(frame); };

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
  const ro = new ResizeObserver(() => { resize(); kick(); });
  const mo = new MutationObserver(readColors);
  const onVis = () => kick();

  const img = new Image();
  img.decoding = 'async';
  img.onerror = () => { stopped = true; opts.onFail(); };
  img.onload = () => {
    if (stopped) return;
    const portrait = portraitPoints(img), headset = headsetPoints(), grid = graticule();
    resize(); readColors();
    document.fonts?.ready.then(measure);
    const n = mobile ? 2400 : 5200;
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]; // tirage aléatoire : pas de rayures
    particles = Array.from({ length: n }, (_, i) => ({
      a: pick(portrait), b: pick(headset), g: grid[Math.floor((i * grid.length) / n) % grid.length],
      r: Math.random() * Math.PI * 2, s: 0.5 + Math.random() * 0.8, jx: Math.random() - 0.5, jy: Math.random() - 0.5,
    }));
    io.observe(canvas); ro.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', onVis);
    kick();
  };
  img.src = opts.portraitSrc;

  return () => {
    stopped = true; cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect(); mo.disconnect();
    document.removeEventListener('visibilitychange', onVis);
  };
}
