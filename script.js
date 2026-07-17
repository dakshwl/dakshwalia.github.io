const header = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];

const setMenu = (isOpen) => {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen ? "Close menu" : "Open menu";
    navLinks.classList.toggle("open", isOpen);
    header.classList.toggle("menu-visible", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
};

navToggle.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navAnchors.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenu(false);
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        setMenu(false);
    }
});

const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navAnchors.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        { rootMargin: "-35% 0px -55%", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
