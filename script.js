const nav = document.querySelector("nav");
const overlay = document.querySelector(".overlay");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const navLinks = document.querySelectorAll(".nav-link");

function closeAllDropdowns() {
  dropdownToggles.forEach((button) => {
    const navLink = button.closest(".nav-link");
    if (navLink) {
      navLink.classList.remove("open", "link-open");
    }
    button.setAttribute("aria-expanded", "false");
    const arrow = button.querySelector(".arrow");
    if (arrow) {
      arrow.src = "./assets/images/icon-arrow-down.svg";
    }
  });
}

function toggleDropdown(button) {
  const navLink = button.closest(".nav-link");
  if (!navLink) return;

  const isOpen = navLink.classList.contains("open") || navLink.classList.contains("link-open");

  // Close any currently open dropdown first
  closeAllDropdowns();

  // If this dropdown wasn't open, open it
  if (!isOpen) {
    navLink.classList.add("open", "link-open");
    button.setAttribute("aria-expanded", "true");
    const arrow = button.querySelector(".arrow");
    if (arrow) {
      arrow.src = "./assets/images/icon-arrow-up.svg";
    }
  }
}

function openMenu() {
  nav.classList.add("open");
  overlay.classList.add("open");
}

function closeMenu() {
  nav.classList.remove("open");
  overlay.classList.remove("open");
  closeAllDropdowns();
}

// Dropdown click handlers (click only, never hover)
dropdownToggles.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown(button);
  });
});

// Also allow clicking nav-link to trigger dropdown toggle
navLinks.forEach((link) => {
  const toggleBtn = link.querySelector(".dropdown-toggle");
  if (toggleBtn) {
    link.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown-list") && !e.target.closest(".dropdown-toggle")) {
        toggleDropdown(toggleBtn);
      }
    });
  }
});

// Mobile menu handlers
if (openMenuBtn) {
  openMenuBtn.addEventListener("click", openMenu);
  openMenuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  });
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeMenu);
  closeMenuBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      closeMenu();
    }
  });
}

if (overlay) {
  overlay.addEventListener("click", closeMenu);
}

// Clicking outside the navigation closes any open dropdown
document.addEventListener("click", (e) => {
  if (!e.target.closest("nav")) {
    closeAllDropdowns();
  }
});

// Escape key closes open dropdown or mobile menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllDropdowns();
    if (nav && nav.classList.contains("open")) {
      closeMenu();
    }
  }
});
