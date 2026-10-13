import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

const LIGHT = {
  '--bg': 'rgb(255,255,255)', '--fg': 'rgb(11,11,12)', '--muted': 'rgb(107,107,112)',
  '--surface': 'rgb(244,244,245)', '--border': 'rgba(0,0,0,0.08)', '--accent': 'rgb(176,141,87)',
};
const DARK = {
  '--bg': 'rgb(11,11,12)', '--fg': 'rgb(237,237,237)', '--muted': 'rgb(161,161,170)',
  '--surface': 'rgb(20,20,22)', '--border': 'rgba(255,255,255,0.08)', '--accent': 'rgb(200,169,106)',
};

export function initAnimations() {
  initFunctional();
  initTheme();

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    initHero();
    initTextReveal();
    initReveals();
    initCounters();
    initTimelines();
    initCardTilt();
    initMagnetic();
  });
  mm.add('(hover: hover) and (pointer: fine)', () => { initSpotlight(); });
}

/* ---------- Cosas que funcionan siempre (con o sin animaciones) ---------- */
function initFunctional() {
  // Barra de progreso y nav que se oculta al bajar
  const nav = document.querySelector<HTMLElement>('#nav');
  const progress = document.querySelector<HTMLElement>('#progress');
  if (nav) {
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        if (progress) progress.style.transform = `scaleX(${self.progress})`;
        const hide = self.direction === 1 && self.scroll() > 200;
        nav.style.transform = hide ? 'translateY(-100%)' : 'translateY(0)';
        nav.style.transition = 'transform .3s ease';
      },
    });
  }

  initSkillPopover();

  // Copiar email
  const btn = document.querySelector<HTMLButtonElement>('#copy-email');
  const label = document.querySelector<HTMLElement>('#copy-email-label');
  const status = document.querySelector<HTMLElement>('#copy-status');
  btn?.addEventListener('click', async () => {
    const email = btn.dataset.email!;
    try { await navigator.clipboard.writeText(email); } catch { location.href = `mailto:${email}`; return; }
    if (label) label.textContent = btn.dataset.copied ?? 'Email copiado ✓';
    if (status) status.textContent = btn.dataset.copiedStatus ?? 'Email copiado al portapapeles';
    setTimeout(() => { if (label) label.textContent = email; }, 2000);
  });

  // Filtro de proyectos (con animación Flip si hay movimiento permitido)
  const filters = document.querySelectorAll<HTMLButtonElement>('#project-filters [data-filter]');
  const items = gsap.utils.toArray<HTMLElement>('.project-item');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  filters.forEach((f) =>
    f.addEventListener('click', () => {
      const cat = f.dataset.filter!;
      filters.forEach((x) => x.setAttribute('aria-pressed', String(x === f)));
      const state = reduce ? null : Flip.getState(items);
      items.forEach((it) => it.classList.toggle('hidden', cat !== 'all' && it.dataset.category !== cat));
      if (state) Flip.from(state, { duration: 0.6, ease: 'power2.inOut', absolute: false, onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }) });
      ScrollTrigger.refresh();
    }),
  );
  document.querySelectorAll<HTMLElement>('#project-filters [aria-pressed="true"]').forEach((b) => (b.style.color = 'var(--fg)'));
}

/* ---------- A4: de blanco a oscuro con el scroll ---------- */
function initTheme() {
  const hero = document.querySelector('#inicio');
  if (!hero) return; // páginas sin hero ya son oscuras (data-theme="dark")
  // El fondo se interpola; el color del texto cambia de golpe en el punto medio,
  // así nunca hay texto gris sobre fondo gris (contraste siempre alto).
  const root = document.documentElement;
  const pick = (o: Record<string, string>, keys: string[]) => Object.fromEntries(keys.map((k) => [k, o[k]]));
  const BG = ['--bg', '--surface', '--border'];
  const FG = ['--fg', '--muted', '--accent'];
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: hero, start: '55% top', end: 'bottom 12%', scrub: true },
  });
  tl.fromTo(root, pick(LIGHT, BG), { ...pick(DARK, BG), duration: 1 }, 0);
  tl.fromTo(root, pick(LIGHT, FG), { ...pick(DARK, FG), duration: 0.001, immediateRender: false }, 0.5);
  // El vídeo se desvanece antes de que el fondo empiece a oscurecerse (A5)
  gsap.to('#avatar-wrap', {
    yPercent: -10, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: '55% top', scrub: true },
  });
}

/* ---------- Hero: nombre letra a letra (A1) ---------- */
function initHero() {
  const name = document.querySelector<HTMLElement>('#hero-name');
  if (!name) return;
  const run = () => {
    const split = SplitText.create(name, { type: 'words,chars', mask: 'chars', wordsClass: 'inline-block whitespace-nowrap' });
    gsap.from(split.chars, { yPercent: 115, duration: 0.9, ease: 'expo.out', stagger: 0.03, delay: 0.1 });
    gsap.from(['#hero-headline', '#hero-tagline', '#hero-cta'], {
      y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.5,
    });
  };
  document.fonts.ready.then(run);

  // Indicador de scroll (A3)
  gsap.fromTo('#scroll-dot', { yPercent: -100 }, { yPercent: 250, duration: 1.6, ease: 'sine.inOut', repeat: -1 });
}

/* ---------- A6: el texto de "Sobre mí" se ilumina al hacer scroll ---------- */
function initTextReveal() {
  const el = document.querySelector<HTMLElement>('#about-text');
  if (!el) return;
  document.fonts.ready.then(() => {
    const split = SplitText.create(el.querySelectorAll('p'), { type: 'words' });
    gsap.fromTo(split.words, { opacity: 0.15 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true },
    });
  });
}

/* ---------- A9: entrada escalonada ---------- */
function initReveals() {
  gsap.set('.reveal', { opacity: 0, y: 40 });
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
  });
}

/* ---------- A7: contadores ---------- */
function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(obj, { v: target, duration: 1.5, ease: 'power2.out', onUpdate: () => { el.textContent = String(Math.round(obj.v)); } }),
    });
  });
}

/* ---------- A12: líneas temporales ---------- */
function initTimelines() {
  document.querySelectorAll<HTMLElement>('.timeline').forEach((tl) => {
    const line = tl.querySelector('.tl-line');
    if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 75%', end: 'bottom 60%', scrub: true } });
    gsap.from(tl.querySelectorAll('.tl-item'), {
      opacity: 0, x: -20, duration: 0.7, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: tl, start: 'top 80%', once: true },
    });
  });
}

/* ---------- A10: inclinación sutil de tarjetas ---------- */
function initCardTilt() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3' });
    gsap.set(card, { transformPerspective: 1000 });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 6);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

/* ---------- A14: botones magnéticos ---------- */
function initMagnetic() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.2);
      y((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

/* ---------- A13: brillo que sigue al cursor ---------- */
function initSpotlight() {
  document.querySelectorAll<HTMLElement>('.spot').forEach((el) =>
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    }),
  );
}

/* ---------- Habilidades: panel con los proyectos donde se usó ---------- */
function initSkillPopover() {
  const pop = document.querySelector<HTMLElement>('#skill-pop');
  if (!pop) return;
  const titles: Record<string, string> = JSON.parse(pop.dataset.titles ?? '{}');
  const base = pop.dataset.base ?? '/proyectos/';
  const $ = (id: string) => pop.querySelector<HTMLElement>(id)!;
  const [title, label, list, note] = [$('#skill-pop-title'), $('#skill-pop-label'), $('#skill-pop-list'), $('#skill-pop-note')];
  const chips = document.querySelectorAll<HTMLButtonElement>('.chip[data-projects]');
  let active: HTMLButtonElement | null = null;
  let timer: number | undefined;

  const hideNow = () => {
    pop.hidden = true;
    active?.classList.remove('is-active');
    active?.setAttribute('aria-expanded', 'false');
    active = null;
  };
  const hideSoon = () => { clearTimeout(timer); timer = window.setTimeout(hideNow, 180); };

  const show = (chip: HTMLButtonElement) => {
    clearTimeout(timer);
    if (active && active !== chip) { active.classList.remove('is-active'); active.setAttribute('aria-expanded', 'false'); }
    active = chip;
    chip.classList.add('is-active');
    chip.setAttribute('aria-expanded', 'true');

    const ids = (chip.dataset.projects ?? '').split(',').filter(Boolean);
    title.textContent = chip.textContent?.trim() ?? '';
    list.replaceChildren();
    if (ids.length) {
      label.textContent = ids.length === 1 ? (pop.dataset.one ?? 'La uso en este proyecto') : (pop.dataset.many ?? 'La uso en {n} proyectos').replace('{n}', String(ids.length));
      ids.forEach((id) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `${base}${id}/`;
        a.textContent = `${titles[id] ?? id} →`;
        a.className = 'block rounded-md py-1 text-accent hover:underline';
        li.append(a);
        list.append(li);
      });
    } else {
      label.textContent = '';
    }
    note.textContent = chip.dataset.note ?? '';
    note.hidden = !note.textContent;

    pop.hidden = false;
    const r = chip.getBoundingClientRect();
    const w = pop.offsetWidth, h = pop.offsetHeight;
    const left = Math.min(Math.max(12, r.left), innerWidth - w - 12);
    const below = r.bottom + 8;
    pop.style.left = `${left}px`;
    pop.style.top = `${below + h > innerHeight - 12 ? Math.max(12, r.top - h - 8) : below}px`;
  };

  chips.forEach((chip) => {
    chip.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(chip); });
    chip.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hideSoon(); });
    chip.addEventListener('focus', () => show(chip));
    chip.addEventListener('blur', hideSoon);
    // En táctil, un segundo toque sobre la misma habilidad cierra el panel.
    // (El foco ya abre el panel en el primer toque, así que hay que recordar el estado previo.)
    let wasOpen = false;
    chip.addEventListener('pointerdown', (e) => { wasOpen = e.pointerType !== 'mouse' && active === chip && !pop.hidden; });
    chip.addEventListener('click', (e) => { e.stopPropagation(); if (wasOpen) { hideNow(); chip.blur(); } else show(chip); wasOpen = false; });
  });
  pop.addEventListener('pointerenter', () => clearTimeout(timer));
  pop.addEventListener('pointerleave', hideSoon);
  document.addEventListener('click', (e) => { if (!pop.contains(e.target as Node)) hideNow(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideNow(); });
  addEventListener('scroll', hideNow, { passive: true });
}
