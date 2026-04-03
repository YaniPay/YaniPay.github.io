document.documentElement.classList.add("js");

const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const supportsObserver = "IntersectionObserver" in window;
const spotlight = document.querySelector(".spotlight");

if (spotlight) {
  let currentX = window.innerWidth * 0.5;
  let currentY = window.innerHeight * 0.24;
  let targetX = currentX;
  let targetY = currentY;

  const animateSpotlight = (now) => {
    const phase = now * 0.00014;
    const phase2 = now * 0.00009;
    targetX = (0.5 + Math.sin(phase) * 0.26 + Math.sin(phase2) * 0.06) * window.innerWidth;
    targetY = (0.26 + Math.cos(phase * 0.92) * 0.12 + Math.cos(phase2 * 1.1) * 0.04) * window.innerHeight;

    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    const xPercent = ((currentX / Math.max(window.innerWidth, 1)) * 100).toFixed(2) + "%";
    const yPercent = ((currentY / Math.max(window.innerHeight, 1)) * 100).toFixed(2) + "%";

    spotlight.style.setProperty("--mx", xPercent);
    spotlight.style.setProperty("--my", yPercent);

    requestAnimationFrame(animateSpotlight);
  };

  requestAnimationFrame(animateSpotlight);
}

const setCounterValue = (element, value) => {
  const prefix = element.dataset.prefix || "";
  const suffix = element.dataset.suffix || "";
  element.textContent = `${prefix}${value.toLocaleString("en-US")}${suffix}`;
};

if (supportsObserver) {
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

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = Number(element.dataset.count || 0);
        const duration = 1100;
        const startedAt = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);
          setCounterValue(element, value);

          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
        counterObserver.unobserve(element);
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((node) => counterObserver.observe(node));
} else {
  revealElements.forEach((node) => node.classList.add("visible"));
  counters.forEach((node) => setCounterValue(node, Number(node.dataset.count || 0)));
}

const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
