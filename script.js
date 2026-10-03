/* ============================================================
   MS MB Event Planning — Redesign interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var grid = document.getElementById("galleryGrid");
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-label", "Image preview");
  lb.innerHTML =
    '<button type="button" aria-label="Close preview">&times;</button><img src="" alt="Event photo">';
  document.body.appendChild(lb);

  var lbImg = lb.querySelector("img");
  var lbClose = lb.querySelector("button");

  function openLb(src) {
    lbImg.src = src;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLb() {
    lb.classList.remove("open");
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", function (e) {
    var img = e.target.closest("img");
    if (img) openLb(img.src);
  });
  lbClose.addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) {
    if (e.target === lb) closeLb();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });

  /* ---------- Quote form -> WhatsApp ---------- */
  var form = document.getElementById("quoteForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("qName").value.trim();
    var company = document.getElementById("qCompany").value.trim();
    var type = document.getElementById("qType").value;
    var guests = document.getElementById("qGuests").value.trim();
    var date = document.getElementById("qDate").value.trim();
    var details = document.getElementById("qDetails").value.trim();

    var lines = ["Hi MS MB Event Planning, I'd like a quote for an event."];
    if (name) lines.push("Name: " + name);
    if (company) lines.push("Company: " + company);
    if (type) lines.push("Event type: " + type);
    if (guests) lines.push("Guests (approx): " + guests);
    if (date) lines.push("Event date: " + date);
    if (details) lines.push("Details: " + details);

    var msg = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/27710311852?text=" + msg, "_blank", "noopener");
  });
})();