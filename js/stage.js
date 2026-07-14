/* stage.js — fixed 1920x1080 stage, letterbox scaling via transform only (§5) */
(function () {
  "use strict";

  var cfg = window.HUB_CONFIG.stage;
  var stage = document.getElementById("stage");
  var raf = null;

  function fit() {
    var scale = Math.min(
      window.innerWidth / cfg.width,
      window.innerHeight / cfg.height
    );
    stage.style.transform =
      "translate(-50%, -50%) scale(" + scale + ")";
  }

  function onResize() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(fit);
  }

  window.addEventListener("resize", onResize);
  fit();
})();
