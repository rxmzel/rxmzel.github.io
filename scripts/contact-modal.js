const contactModal = document.querySelector(".contact-modal");
const contactOpenLinks = document.querySelectorAll('a[href="#contact"]');
const contactClose = document.querySelector(".contact-close");

function openContactModal(event) {
  event.preventDefault();

  contactModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeContactModal() {
  contactModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

contactOpenLinks.forEach((link) => {
  link.addEventListener("click", openContactModal);
});

contactClose.addEventListener("click", closeContactModal);

contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) {
    closeContactModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeContactModal();
  }
});