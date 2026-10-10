/* Metal Wire Art — gallery rendering, filters, lightbox, nav */
(function () {
  "use strict";

  var grid = document.getElementById("gallery-grid");
  var filtersEl = document.getElementById("filters");
  var activeCategory = "All";

  // ---- Render gallery cards from GALLERY data (gallery-data.js) ----
  function shortCaption(alt) {
    // Keep captions short: drop trailing ", close-up" style qualifiers.
    return alt.replace(/,\s*close-up$/, "").replace(/,\s*side view$/, "");
  }

  function render() {
    grid.innerHTML = "";
    var items = GALLERY.filter(function (it) {
      return activeCategory === "All" || it.category === activeCategory;
    });
    items.forEach(function (it, idx) {
      var fig = document.createElement("figure");
      fig.className = "card";
      fig.tabIndex = 0;
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "View larger: " + it.alt);
      fig.dataset.index = idx;

      var img = document.createElement("img");
      img.src = "images/thumbs/" + it.file;
      img.alt = it.alt;
      img.loading = "lazy";
      img.decoding = "async";

      var cap = document.createElement("figcaption");
      var span = document.createElement("span");
      span.textContent = shortCaption(it.alt);
      var cat = document.createElement("span");
      cat.className = "cat";
      cat.textContent = it.category;
      cap.appendChild(span);
      cap.appendChild(cat);

      fig.appendChild(img);
      fig.appendChild(cap);
      fig.addEventListener("click", function () { openLightbox(idx); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(idx); }
      });
      grid.appendChild(fig);
    });
  }

  // ---- Filter chips ----
  function renderFilters() {
    var cats = ["All"].concat(CATEGORIES);
    cats.forEach(function (c) {
      var btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.type = "button";
      btn.textContent = c;
      btn.setAttribute("aria-pressed", c === activeCategory ? "true" : "false");
      btn.addEventListener("click", function () {
        activeCategory = c;
        Array.prototype.forEach.call(filtersEl.children, function (b) {
          b.setAttribute("aria-pressed", b.textContent === c ? "true" : "false");
        });
        render();
      });
      filtersEl.appendChild(btn);
    });
  }

  // ---- Lightbox ----
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCaption = document.getElementById("lightbox-caption");
  var currentItems = [];
  var currentIndex = 0;
  var lastFocus = null;

  function openLightbox(idx) {
    currentItems = GALLERY.filter(function (it) {
      return activeCategory === "All" || it.category === activeCategory;
    });
    currentIndex = idx;
    lastFocus = document.activeElement;
    updateLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lightbox-close").focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    currentIndex = (currentIndex + d + currentItems.length) % currentItems.length;
    updateLightbox();
  }
  function updateLightbox() {
    var it = currentItems[currentIndex];
    lbImg.src = "images/gallery/" + it.file;
    lbImg.alt = it.alt;
    lbCaption.textContent = it.alt + " — " + (currentIndex + 1) + " of " + currentItems.length;
    // Buy / inquire button: Square payment link when configured, else email.
    var buyBox = document.getElementById("lightbox-buy");
    buyBox.innerHTML = "";
    var a = document.createElement("a");
    var url = (typeof BUY_LINKS !== "undefined") ? (BUY_LINKS[it.file] || BUY_LINKS["*"]) : null;
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "btn btn-gold";
      a.textContent = "Buy this piece";
    } else {
      a.href = "mailto:gingerrogersgift@gmail.com?subject=" +
        encodeURIComponent("Question about: " + shortCaption(it.alt));
      a.className = "btn btn-outline";
      a.textContent = "Ask about this piece";
    }
    buyBox.appendChild(a);
  }

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", function () { step(-1); });
  document.getElementById("lightbox-next").addEventListener("click", function () { step(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // ---- Mobile nav ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---- Footer year ----
  document.getElementById("year").textContent = new Date().getFullYear();

  renderFilters();
  render();
})();
