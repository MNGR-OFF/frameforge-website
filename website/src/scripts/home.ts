const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const regions = [...document.querySelectorAll<HTMLElement>('[data-motion]')];
const visible = new WeakSet<Element>();
let paused = false;
const pauseButton = document.querySelector<HTMLButtonElement>('.motion-control');

function updateMotion() {
  regions.forEach(region => region.classList.toggle('motion-running', visible.has(region) && !document.hidden && !reduced.matches && !paused));
  document.documentElement.classList.toggle('motion-paused', paused);
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target); });
  updateMotion();
}, { threshold: 0.08 });
regions.forEach(region => observer.observe(region));
document.addEventListener('visibilitychange', updateMotion);
reduced.addEventListener('change', updateMotion);
if (pauseButton) {
  pauseButton.hidden = false;
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.textContent = paused ? 'Resume motion' : 'Pause motion';
    updateMotion();
  });
}

const demo = document.querySelector<HTMLElement>('[data-demo]');
const movement = document.querySelector<HTMLInputElement>('#movement');
const tilt = document.querySelector<HTMLInputElement>('#tilt');
const button = demo?.querySelector<HTMLButtonElement>('.demo-button');
const settings = document.querySelector<HTMLFieldSetElement>('[data-demo-settings]');
if (demo && movement && tilt && button && settings) {
  settings.disabled = false;
  function render() {
    if (!demo || !movement || !tilt) return;
    demo.style.setProperty('--stripe-distance', `${Number(movement.value)}px`);
    demo.style.setProperty('--button-tilt', `${Number(tilt.value)}deg`);
    const movementOutput = document.querySelector<HTMLOutputElement>('#movement-output');
    const tiltOutput = document.querySelector<HTMLOutputElement>('#tilt-output');
    if (movementOutput) movementOutput.value = `${movement.value} px`;
    if (tiltOutput) tiltOutput.value = `${tilt.value}°`;
    movement.setAttribute('aria-valuetext', `${movement.value} pixels`);
    tilt.setAttribute('aria-valuetext', `${tilt.value} degrees`);
  }
  movement.addEventListener('input', render);
  tilt.addEventListener('input', render);
  document.querySelector('[data-demo-reset]')?.addEventListener('click', () => { movement.value = '48'; tilt.value = '-3'; render(); });
  const announcement = demo.querySelector('[data-demo-announcement]');
  button.addEventListener('click', () => { if (announcement) announcement.textContent = 'Example activated. This browser demo does not create or import a Roblox interface.'; });
  render();
}
