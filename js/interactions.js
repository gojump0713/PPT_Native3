/* interactions.js — keyboard map (§13) + magnetic hover (§12.3) */
(function () {
  "use strict";

  var cfg = window.HUB_CONFIG;
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".cta-btn"));

  /* ---------- Keyboard (§13) ----------
     Tab / Shift+Tab : native focus traversal
     Enter           : native <a> activation
     Space           : activate focused button (links need JS for Space)
     1 / 2 / 3       : open each content in a new tab
     F               : fullscreen toggle
     ESC             : native fullscreen exit */
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented) return;

    // Space on a focused CTA — prevent page scroll semantics, trigger link
    if ((e.key === " " || e.key === "Spacebar") &&
        document.activeElement &&
        document.activeElement.classList.contains("cta-btn")) {
      e.preventDefault();
      document.activeElement.click();
      return;
    }

    if (e.key === "f" || e.key === "F") {
      // Ignore when modifier keys are held (avoid hijacking Ctrl+F)
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      e.preventDefault();
      window.HUB_FULLSCREEN.toggle();
      return;
    }

    if (e.key === "1" || e.key === "2" || e.key === "3") {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var content = cfg.contents[Number(e.key) - 1];
      if (content) {
        var opened = window.open(content.url, "_blank", "noopener,noreferrer");
        if (!opened) {
          // popup blocked — focus the matching button so Enter works
          var btn = buttons[Number(e.key) - 1];
          if (btn) btn.focus();
        }
      }
    }
  });

  /* ---------- Magnetic hover (§12.3) ----------
     text: max ±6px / button: max ±3px — restrained by spec */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    buttons.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var nx = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 ~ 0.5
        var ny = (e.clientY - rect.top) / rect.height - 0.5;

        btn.style.setProperty("--mx", nx * 2 * cfg.magnetic.buttonMax + "px");
        btn.style.setProperty("--my", ny * 2 * cfg.magnetic.buttonMax + "px");
        btn.style.setProperty("--tx", nx * 2 * cfg.magnetic.textMax + "px");
        btn.style.setProperty("--ty", ny * 2 * cfg.magnetic.textMax + "px");
      });

      btn.addEventListener("mouseleave", function () {
        ["--mx", "--my", "--tx", "--ty"].forEach(function (p) {
          btn.style.removeProperty(p);
        });
      });
    });
  }
})();
