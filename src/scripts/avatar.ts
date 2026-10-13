import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAvatar() {
  const fig = document.querySelector<HTMLElement>('#avatar');
  const video = document.querySelector<HTMLVideoElement>('#avatar-video');
  const toggle = document.querySelector<HTMLButtonElement>('#avatar-toggle');
  if (!fig || !video) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // (3) Entrada: escala + desenfoque inverso
  if (!reduced) {
    gsap.from(fig, { scale: 0.8, opacity: 0, filter: 'blur(20px)', duration: 1.4, ease: 'expo.out', delay: 0.15 });
  }

  if (canHover) {
    // (2) Cámara lenta suave al pasar el ratón
    const state = { rate: 1 };
    const setRate = (to: number) =>
      gsap.to(state, {
        rate: to, duration: 0.6, ease: 'power2.out', overwrite: true,
        onUpdate: () => { video.playbackRate = state.rate; },
      });
    fig.addEventListener('pointerenter', () => setRate(0.75));
    fig.addEventListener('pointerleave', () => setRate(1));

    // (4) Inclinación 3D siguiendo el cursor
    if (!reduced) {
      const rx = gsap.quickTo(fig, 'rotationX', { duration: 0.6, ease: 'power3' });
      const ry = gsap.quickTo(fig, 'rotationY', { duration: 0.6, ease: 'power3' });
      gsap.set(fig, { transformPerspective: 900 });
      fig.addEventListener('pointermove', (e) => {
        const r = fig.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 12);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
      });
      fig.addEventListener('pointerleave', () => { rx(0); ry(0); });
    }
  } else {
    // (1) Móvil: a color cuando el avatar está centrado, o al tocarlo
    ScrollTrigger.create({
      trigger: fig, start: 'top 65%', end: 'bottom 35%',
      onToggle: (self) => fig.classList.toggle('is-color', self.isActive),
    });
    fig.addEventListener('click', () => fig.classList.toggle('is-color'));
  }

  // (6) Pausar el vídeo cuando no se ve
  new IntersectionObserver(([entry]) => {
    if (fig.dataset.userPaused === 'true') return;
    if (entry.isIntersecting) video.play().catch(() => {});
    else video.pause();
  }, { threshold: 0.05 }).observe(fig);

  // (7) Botón de pausa/play (accesibilidad)
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const pause = !video.paused;
    if (pause) video.pause(); else video.play().catch(() => {});
    fig.dataset.userPaused = String(pause);
    toggle.setAttribute('aria-label', (pause ? toggle.dataset.labelPlay : toggle.dataset.labelPause) ?? (pause ? 'Reproducir vídeo' : 'Pausar vídeo'));
    toggle.textContent = pause ? '▶' : '❚❚';
  });

  // Con "reducir movimiento": solo el póster, sin reproducir
  if (reduced) {
    video.pause();
    fig.dataset.userPaused = 'true';
    if (toggle) { toggle.textContent = '▶'; toggle.setAttribute('aria-label', toggle.dataset.labelPlay ?? 'Reproducir vídeo'); }
  }
}
