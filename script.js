// === TEMA INICIAL ===
(function () {
  const key = "theme";
  const saved = localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const startTheme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", startTheme);

  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const isDark = startTheme === "dark";
  btn.textContent = isDark ? "🌙" : "☀️";
  btn.setAttribute("aria-pressed", String(isDark));
})();

// === TOGGLE DE TEMA ===
document.getElementById("themeToggle")?.addEventListener("click", () => {
  const el = document.documentElement;
  const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
  el.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  const btn = document.getElementById("themeToggle");
  const isDark = next === "dark";
  btn.textContent = isDark ? "🌙" : "☀️";
  btn.setAttribute("aria-pressed", String(isDark));
});

// === REVEAL ON SCROLL ===
const obs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
