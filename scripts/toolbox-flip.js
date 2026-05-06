const toolboxItems = Array.from(document.querySelectorAll(".toolbox-column, .toolbox-item"));

const breakpoints = [50, 475, 650, 915, 1100];

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

  toolboxItems.forEach((item) => {
    previousRects.set(item, item.getBoundingClientRect());
  });
}

function runFlip() {
  toolboxItems.forEach((item) => {
    const first = previousRects.get(item);
    const last = item.getBoundingClientRect();

    if (!first) return;

    const dx = first.left - last.left;
    const dy = first.top - last.top;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

    item.style.transition = "none";
    item.style.transform = `translate(${dx}px, ${dy}px)`;

    item.offsetHeight;

    requestAnimationFrame(() => {
      item.style.transition = "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
      item.style.transform = "translate(0, 0)";
    });

    item.addEventListener(
      "transitionend",
      () => {
        item.style.transition = "";
        item.style.transform = "";
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
    runFlip();
  });
});