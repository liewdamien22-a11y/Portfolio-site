(function () {
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

(function () {
  var box = document.getElementById("lightbox");
  if (!box || typeof box.showModal !== "function") return;
  var boxImg = box.querySelector(".lightbox__img");

  function open(src, alt) {
    boxImg.src = src;
    boxImg.alt = alt || "";
    box.showModal();
  }

  // Images that expand when clicked
  document.querySelectorAll(".js-zoom").forEach(function (img) {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.addEventListener("click", function () { open(img.currentSrc || img.src, img.alt); });
    img.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img.currentSrc || img.src, img.alt); }
    });
  });

  // Links that open their target image in the lightbox
  document.querySelectorAll(".js-lightbox").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      open(link.href, link.dataset.alt);
    });
  });

  box.addEventListener("click", function () { box.close(); });
})();
