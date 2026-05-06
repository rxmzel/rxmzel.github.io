(() => {
  const toolboxElements = Array.from(
    document.querySelectorAll(".toolbox-column, .toolbox-item")
  );

  let previousRects = new Map();
  let currentBand = getBreakpointBand();

  function getBreakpointBand() {
    const width = window.innerWidth;

    if (width >= 1100) return "desktop-3col";
    if (width >= 915) return "tablet-2col-wide-icons";
    if (width >= 650) return "tablet-2col";
    if (width >= 475) return "mobile-4icons";
    return "mobile-3icons";
  }

  function captureRects() {
    previousRects.clear();

    toolboxElements.forEach((element) => {
      previousRects.set(element, element.getBoundingClientRect());
    });
  }

  function animateFlip() {
    toolboxElements.forEach((element) => {
      const first = previousRects.get(element);
      const last = element.getBoundingClientRect();

      if (!first) return;

      const dx = first.left - last.left;
      const dy = first.top - last.top;

      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

      element.style.transition = "none";
      element.style.transform = `translate(${dx}px, ${dy}px)`;

      element.offsetHeight;

      requestAnimationFrame(() => {
        element.style.transition =
          "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
        element.style.transform = "translate(0, 0)";
      });

      element.addEventListener(
        "transitionend",
        () => {
          element.style.transition = "";
          element.style.transform = "";
        },
        { once: true }
      );
    });

    captureRects();
  }

  window.addEventListener("load", captureRects);

  window.addEventListener("resize", () => {
    const newBand = getBreakpointBand();

    if (newBand === currentBand) {
      captureRects();
      return;
    }

    currentBand = newBand;

    requestAnimationFrame(() => {
      animateFlip();
    });
  });
})();