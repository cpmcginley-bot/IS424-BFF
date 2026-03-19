document.addEventListener("DOMContentLoaded", () => {
  const burgers = document.querySelectorAll(".navbar-burger");

  burgers.forEach((burger) => {
    burger.addEventListener("click", () => {
      const targetId = burger.dataset.target;
      const targetMenu = document.getElementById(targetId);

      burger.classList.toggle("is-active");
      burger.setAttribute(
        "aria-expanded",
        burger.classList.contains("is-active") ? "true" : "false"
      );

      if (targetMenu) {
        targetMenu.classList.toggle("is-active");
      }
    });
  });
});
