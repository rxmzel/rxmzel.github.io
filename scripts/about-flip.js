const aboutItems = Array.from(
  document.querySelectorAll(".about-column")
);

let previousRects = new Map();
let currentBand = getAboutBreakpointBand();

function getAboutBreakpointBand() {
  const width = window.innerWidth;

  if (width >= 950) return "about-1-2";
  if (width >= 575) return "about-2col";
  return "about-stacked";
}

function captureAboutRects() {
  previousRects.clear();

  aboutItems.forEach((item) => {
    previousRects.set(item, item.getBoundingClientRect());
  });
}

function runAboutFlip(options = {}) {
  aboutItems.forEach((item, index) => {
    if (options.skipSecondChild && index === 1) return;

    const first = previousRects.get(item);
    const last = item.getBoundingClientRect();

    if (!first) return;

    const dx = first.left - last.left;
    const dy = first.top - last.top;

    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;

    item.style.transition = "none";
    item.style.transformOrigin = "top left";
    item.style.transform = `translate(${dx}px, ${dy}px)`;

    item.offsetHeight;

    requestAnimationFrame(() => {
      item.style.transition =
        "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)";
      item.style.transform = "translate(0, 0)";
    });

    item.addEventListener(
      "transitionend",
      () => {
        item.style.transition = "";
        item.style.transform = "";
        item.style.transformOrigin = "";
      },
      { once: true }
    );
  });

  captureAboutRects();
}

window.addEventListener("load", captureAboutRects);

window.addEventListener("resize", () => {
  const oldBand = currentBand;
  const newBand = getAboutBreakpointBand();

  if (newBand === oldBand) {
    return;
  }

  const firstRects = new Map(previousRects);
  currentBand = newBand;

  const is950Change =
    (oldBand === "about-2col" && newBand === "about-1-2") ||
    (oldBand === "about-1-2" && newBand === "about-2col");

  requestAnimationFrame(() => {
    previousRects = firstRects;

    runAboutFlip({
      skipSecondChild: is950Change
    });
  });
});