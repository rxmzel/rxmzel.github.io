const navLinks = document.querySelectorAll(".nav-logo, .nav-links a");

function isCurrentSection(target) {
  const rect = target.getBoundingClientRect();
  return rect.top <= 80 && rect.bottom > 80;
}

function smoothScrollToTarget(target) {
  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function runSectionTransition(targetHref) {
  if (targetHref === "#") {
    smoothScrollToTop();
    return;
  }

  const target = document.querySelector(targetHref);
  if (!target) return;

  if (isCurrentSection(target)) {
    smoothScrollToTarget(target);
    return;
  }

  document.body.classList.remove("is-transitioning-in", "is-transitioning-out");
  void document.body.offsetWidth;

  document.body.classList.add("is-transitioning-out");

  setTimeout(() => {
    target.scrollIntoView({
      behavior: "instant",
      block: "start"
    });

    document.body.classList.remove("is-transitioning-out");
    void document.body.offsetWidth;

    document.body.classList.add("is-transitioning-in");

    setTimeout(() => {
      document.body.classList.remove("is-transitioning-in");
    }, 520);
  }, 320);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href) return;
    if (href === "#contact") return;

    event.preventDefault();

    runSectionTransition(href);
  });
});