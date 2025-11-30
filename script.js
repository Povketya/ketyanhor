(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const header = document.getElementById("site-header");
  const navPanel = document.getElementById("nav-panel");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const themeToggle = document.getElementById("theme-toggle");
  const scrollTopButton = document.getElementById("scroll-top");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const storedTheme = localStorage.getItem("portfolio-theme");
  setTheme(storedTheme || "light");

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    themeToggle?.setAttribute("title", `Switch to ${nextTheme} theme`);
  }

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  function closeMenu() {
    navPanel?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation menu");
    body.classList.remove("menu-open");
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = navPanel?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    body.classList.toggle("menu-open", Boolean(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (
      navPanel?.classList.contains("open") &&
      !navPanel.contains(event.target) &&
      !navToggle?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));
  }

  const revealElements = [...document.querySelectorAll(".reveal")];
  if (!reduceMotion && "IntersectionObserver" in window) {
    root.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -48px",
        threshold: 0.08,
      }
    );

    requestAnimationFrame(() => {
      revealElements.forEach((element) => revealObserver.observe(element));
    });
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  function updateScrollUi() {
    const isScrolled = window.scrollY > 24;
    header?.classList.toggle("scrolled", isScrolled);
    scrollTopButton?.classList.toggle("visible", window.scrollY > 620);
  }

  updateScrollUi();
  window.addEventListener("scroll", updateScrollUi, { passive: true });

  scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  const projectCards = [...document.querySelectorAll(".project-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const searchInput = document.getElementById("project-search");
  const resultsText = document.getElementById("project-results");
  const viewAllButton = document.getElementById("view-all-projects");
  let activeFilter = "all";
  let showAll = false;

  function filterProjects() {
    const query = searchInput?.value.trim().toLowerCase() || "";
    let visibleCount = 0;
    let matchingCount = 0;

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(",");
      const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
      const matchesSearch = !query || card.dataset.keywords.includes(query) || card.textContent.toLowerCase().includes(query);
      const matches = matchesFilter && matchesSearch;
      const isCollapsedExtra = card.dataset.extra === "true" && !showAll && activeFilter === "all" && !query;
      const isVisible = matches && !isCollapsedExtra;

      if (matches) matchingCount += 1;
      if (isVisible) visibleCount += 1;
      card.hidden = !isVisible;
    });

    if (resultsText) {
      resultsText.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
    }

    const canToggleAll = activeFilter === "all" && !query && matchingCount > visibleCount;
    const shouldShowCollapse = activeFilter === "all" && !query && showAll;
    if (viewAllButton) {
      viewAllButton.parentElement.hidden = !(canToggleAll || shouldShowCollapse);
      viewAllButton.setAttribute("aria-expanded", String(showAll));
      viewAllButton.firstChild.textContent = showAll ? "Show Featured Projects " : "View All Projects ";
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      filterProjects();
    });
  });

  searchInput?.addEventListener("input", filterProjects);

  viewAllButton?.addEventListener("click", () => {
    showAll = !showAll;
    filterProjects();
    if (!showAll) {
      document.getElementById("projects")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    }
  });

  filterProjects();

  const dialogs = [...document.querySelectorAll(".project-dialog")];
  document.querySelectorAll(".dialog-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const dialog = document.getElementById(trigger.dataset.dialog);
      if (!dialog) return;
      dialog.showModal();
      body.classList.add("dialog-open");
    });
  });

  dialogs.forEach((dialog) => {
    dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isOutside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (isOutside) dialog.close();
    });
    dialog.addEventListener("close", () => body.classList.remove("dialog-open"));
  });

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();
    const bodyText = `Hello Povketya NHOR,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    const mailto = `mailto:povketya09@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    if (formStatus) formStatus.textContent = "Opening your email application…";
    window.location.href = mailto;
  });

  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
