// Shucheng Jia — personal website scripts
(function () {
  "use strict";

  // ---------- Email (assembled at runtime to deter scrapers) ----------
  document.querySelectorAll("[data-email]").forEach(function (el) {
    var addr = el.getAttribute("data-user") + "@" + el.getAttribute("data-domain");
    el.setAttribute("href", "mailto:" + addr);
  });

  // ---------- Media boxes ----------
  // <div class="media-box" data-video="videos/x.mp4" data-poster="images/x.jpg" data-label="...">
  // <div class="media-box" data-img="images/x.jpg" data-label="...">
  // Missing files fall back to a labelled placeholder, so a page never shows a broken player.
  function showPlaceholder(box) {
    var label = box.getAttribute("data-label") || "Media coming soon";
    var file = box.getAttribute("data-video") || box.getAttribute("data-img") || "";
    box.innerHTML = "";
    box.classList.add("placeholder");
    var icon = document.createElement("i");
    icon.className = box.hasAttribute("data-video") ? "fa-solid fa-film" : "fa-regular fa-image";
    var text = document.createElement("span");
    text.textContent = label + (file ? " — " + file : "");
    var wrap = document.createElement("div");
    wrap.appendChild(icon);
    wrap.appendChild(text);
    box.appendChild(wrap);
  }

  document.querySelectorAll(".media-box").forEach(function (box) {
    var videoSrc = box.getAttribute("data-video");
    var imgSrc = box.getAttribute("data-img");
    var autoplay = box.hasAttribute("data-autoplay");

    if (videoSrc) {
      var v = document.createElement("video");
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.preload = "metadata";
      if (box.getAttribute("data-poster")) v.poster = box.getAttribute("data-poster");
      if (autoplay) v.autoplay = true;
      v.addEventListener("error", function () { showPlaceholder(box); });
      v.src = videoSrc;
      box.appendChild(v);

      if (autoplay) {
        // No control bar (it would cover in-video labels); click to pause / resume
        box.style.cursor = "pointer";
        box.title = "Click to pause / play";
        box.addEventListener("click", function () { v.paused ? v.play().catch(function () {}) : v.pause(); });
      } else {
        // Jon Barron style: play on hover, pause on leave; tap toggles on touch screens
        var row = box.closest(".item") || box;
        row.addEventListener("mouseenter", function () { v.play().catch(function () {}); });
        row.addEventListener("mouseleave", function () { v.pause(); });
        box.addEventListener("click", function () { v.paused ? v.play().catch(function () {}) : v.pause(); });
      }
    } else if (imgSrc) {
      var img = document.createElement("img");
      img.alt = box.getAttribute("data-label") || "";
      img.loading = "lazy";
      img.addEventListener("error", function () { showPlaceholder(box); });
      img.src = imgSrc;
      box.appendChild(img);
    } else {
      showPlaceholder(box);
    }
  });

  // ---------- Quick-link highlighting ----------
  var links = Array.prototype.slice.call(document.querySelectorAll(".quick-links a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    // At the very bottom, the last section wins even if it is short
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      setActive(sections[sections.length - 1].id);
      return;
    }
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) { setActive(sections[i].id); return; }
    }
  }, { rootMargin: "-10% 0px -60% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
  setActive(sections[0].id);
})();
