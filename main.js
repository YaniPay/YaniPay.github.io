const revealNodes = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const animatedValues = document.querySelectorAll("[data-count]");

const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      const prefix = element.dataset.prefix || "";
      const suffix = element.dataset.suffix || "";
      const duration = 1400;
      const startTime = performance.now();

      const render = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = `${prefix}${value.toLocaleString("en-US")}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(render);
        }
      };

      requestAnimationFrame(render);
      numberObserver.unobserve(element);
    });
  },
  {
    threshold: 0.45,
  }
);

animatedValues.forEach((node) => numberObserver.observe(node));

const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
