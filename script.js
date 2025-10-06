// Troca dark/light
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  document.documentElement.setAttribute(
    'data-theme',
    current === 'dark' ? 'light' : 'dark',
  );
  themeToggle.textContent = current === 'dark' ? '🌞' : '🌙';
});

// Troca paleta (emerald → amber → purple)
const paletteToggle = document.getElementById('palette-toggle');
const palettes = ['default', 'amber', 'purple'];
let currentIndex = 0;

paletteToggle.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % palettes.length;
  const theme = palettes[currentIndex];
  document.documentElement.setAttribute('data-theme', theme);
  paletteToggle.textContent =
    theme === 'amber' ? '🟠' : theme === 'purple' ? '💜' : '💚';
});

// Reveal animado ao rolar as areas de projeto
const obs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.projeto').forEach(el => obs.observe(el));
