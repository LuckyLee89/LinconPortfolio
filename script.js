// Alternar tema (salva no localStorage)
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';

root.setAttribute('data-theme', currentTheme);
toggleBtn.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

toggleBtn.addEventListener('click', () => {
  const newTheme =
    root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
});

// Animação de revelação ao rolar
const obs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
