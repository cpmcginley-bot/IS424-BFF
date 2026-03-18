const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  navbar.style.boxShadow =
    window.scrollY > 10
      ? "0 2px 16px rgba(0,0,0,0.12)"
      : "0 1px 12px rgba(0,0,0,0.08)";
});
