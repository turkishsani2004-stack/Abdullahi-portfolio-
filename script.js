// Mobile navigation, gentle reveal effects, contact-form email draft, and footer year.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Reveal sections as they enter the viewport. Keep content visible if unsupported.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Contact form: prepares an email in the visitor's configured mail app.
// For a real backend submission, connect a form service or server endpoint.
const contactForm = document.querySelector("#contactForm");
const formFeedback = document.querySelector("#formFeedback");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Website project inquiry from ${name}`);
    const body = encodeURIComponent(`Hello Abdullahi,\n\n${message}\n\nMy name: ${name}\nMy email: ${email}`);
    if (formFeedback) {
      formFeedback.textContent = "Opening your email app. If nothing opens, email abdullahisaniumar70@gmail.com directly.";
    }
    window.location.href = `mailto:abdullahisaniumar70@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Placeholder project links are intentionally routed to contact rather than fake URLs.
document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const project = link.dataset.project || "project link";
    const note = document.querySelector(".project-note");
    if (note) {
      note.textContent = `${project}: replace this placeholder with your real published URL or GitHub repository before sharing your portfolio.`;
      note.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
