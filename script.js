// ===================== INIT =====================
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const paletteBtn = document.getElementById('palette-toggle');

// garante que o tema inicial sempre exista
if (!root.hasAttribute('data-theme')) {
  root.setAttribute('data-theme', 'light');
}

// estado inicial (com persistência)
const savedTheme = localStorage.getItem('theme') || 'light';
const savedPalette = localStorage.getItem('palette') || 'default';

// aplica estado inicial
root.setAttribute('data-theme', savedTheme);
if (savedPalette !== 'default') root.setAttribute('data-palette', savedPalette);

// ícones iniciais
themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '🌞';
paletteBtn.textContent =
  savedPalette === 'amber' ? '🟠' : savedPalette === 'purple' ? '💜' : '💚';

// ===================== THEME TOGGLE =====================
themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'dark' ? '🌙' : '🌞';
});

// ===================== PALETTE TOGGLE =====================
const order = ['default', 'amber', 'purple'];
paletteBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-palette') || 'default';
  const next = order[(order.indexOf(current) + 1) % order.length];

  if (next === 'default') root.removeAttribute('data-palette');
  else root.setAttribute('data-palette', next);

  localStorage.setItem('palette', next);
  paletteBtn.textContent =
    next === 'amber' ? '🟠' : next === 'purple' ? '💜' : '💚';
});

// ===================== REVEAL ON SCROLL =====================
const obs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      // ====== Diagnóstico rápido ======
      console.log('[portfolio] script.js carregado');

      // Espera o DOM estar pronto (mesmo com/sem 'defer')
      document.addEventListener('DOMContentLoaded', () => {
        const root = document.documentElement;
        const themeBtn = document.getElementById('theme-toggle');
        const paletteBtn = document.getElementById('palette-toggle');

        if (!themeBtn || !paletteBtn) {
          console.error(
            "[portfolio] Botões não encontrados. Confirme os IDs 'theme-toggle' e 'palette-toggle' no HTML.",
          );
          return;
        }

        // Tema inicial (com persistência)
        const savedTheme =
          localStorage.getItem('theme') ||
          root.getAttribute('data-theme') ||
          'light';
        root.setAttribute('data-theme', savedTheme);
        themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '🌞';

        // Paleta inicial (com persistência)
        const savedPalette = localStorage.getItem('palette') || 'default';
        if (savedPalette !== 'default')
          root.setAttribute('data-palette', savedPalette);
        paletteBtn.textContent =
          savedPalette === 'amber'
            ? '🟠'
            : savedPalette === 'purple'
            ? '💜'
            : '💚';

        // Toggle de tema
        themeBtn.addEventListener('click', () => {
          const next =
            root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          root.setAttribute('data-theme', next);
          localStorage.setItem('theme', next);
          themeBtn.textContent = next === 'dark' ? '🌙' : '🌞';
        });

        // Toggle de paleta (default → amber → purple → default)
        const order = ['default', 'amber', 'purple'];
        paletteBtn.addEventListener('click', () => {
          const current = root.getAttribute('data-palette') || 'default';
          const next = order[(order.indexOf(current) + 1) % order.length];

          if (next === 'default') root.removeAttribute('data-palette');
          else root.setAttribute('data-palette', next);

          localStorage.setItem('palette', next);
          paletteBtn.textContent =
            next === 'amber' ? '🟠' : next === 'purple' ? '💜' : '💚';
        });

        // Reveal on scroll (apenas se existirem cards)
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
      });

      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.projeto').forEach(el => obs.observe(el));
