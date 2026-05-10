const aboutSection = document.querySelector(".about");

let hasRevealedAbout = false;
let saturationTimer = null;

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!aboutSection) return;

      if (entry.isIntersecting) {
        if (!hasRevealedAbout) {
          aboutSection.classList.add("has-revealed");
          hasRevealedAbout = true;
        }

        saturationTimer = setTimeout(() => {
          aboutSection.classList.add("is-visible");
        }, 200);
      } else {
        clearTimeout(saturationTimer);
        aboutSection.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.45
  }
);

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}