const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
);

revealElements.forEach((node) => revealObserver.observe(node));

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      const prefix = element.dataset.prefix || "";
      const suffix = element.dataset.suffix || "";
      const duration = 1100;
      const startedAt = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = `${prefix}${value.toLocaleString("en-US")}${suffix}`;

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.35 }
);

counters.forEach((node) => counterObserver.observe(node));

const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
