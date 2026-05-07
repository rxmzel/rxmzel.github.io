const aboutSection = document.querySelector(".about");

const aboutObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      aboutSection.classList.add("is-visible");
      observer.unobserve(aboutSection);
    });
  },
  {
    threshold: 0.35
  }
);

if (aboutSection) {
  aboutObserver.observe(aboutSection);
}