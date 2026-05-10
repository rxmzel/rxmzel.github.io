const heroSubtitle = document.querySelector(".hero h3");
const navbar = document.querySelector(".navbar");

function updateNavbarLogo() {
  if (!heroSubtitle || !navbar) return;

  const h2Bottom = heroSubtitle.getBoundingClientRect().bottom;

  if (h2Bottom <= 0) {
    navbar.classList.add("show-logo");
  } else {
    navbar.classList.remove("show-logo");
  }
}

window.addEventListener("load", updateNavbarLogo);
window.addEventListener("scroll", updateNavbarLogo);
window.addEventListener("resize", updateNavbarLogo);