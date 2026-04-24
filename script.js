const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      formNote.textContent = "Please complete the required fields before sending your enquiry.";
      formNote.classList.remove("is-success");
      contactForm.reportValidity();
      return;
    }

    formNote.textContent =
      "Thanks. Your message is validated in the browser and ready to connect to your backend, Formspree, Web3Forms, or a custom API.";
    formNote.classList.add("is-success");
    contactForm.reset();
  });
}
