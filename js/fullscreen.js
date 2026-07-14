/* fullscreen.js — F key + top-right button toggle, ESC exits (§13) */
(function () {
  "use strict";

  var btn = document.getElementById("fsBtn");

  function isFullscreen() {
    return !!document.fullscreenElement;
  }

  function toggle() {
    if (isFullscreen()) {
      document.exitFullscreen().catch(function () {});
    } else {
      document.documentElement.requestFullscreen().catch(function (err) {
        console.warn("[hub] fullscreen rejected:", err);
      });
    }
  }

  btn.addEventListener("click", toggle);

  document.addEventListener("fullscreenchange", function () {
    var label = btn.querySelector(".fs-label");
    label.textContent = isFullscreen() ? "Exit Full Screen" : "Full Screen";
  });

  window.HUB_FULLSCREEN = { toggle: toggle };
})();
