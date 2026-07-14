/* env-gate.js — PC-only policy gate (§18)
   Mobile UA OR viewport width < 1024px OR portrait → show static notice only. */
(function () {
  "use strict";

  var gate = document.getElementById("envGate");
  var viewport = document.getElementById("viewport");
  var minWidth = (window.HUB_CONFIG && window.HUB_CONFIG.gate.minWidth) || 1024;

  var MOBILE_UA = /Android|iPhone|iPad|iPod|Mobile|Tablet|webOS|BlackBerry|Opera Mini|IEMobile/i;

  function isBlocked() {
    if (MOBILE_UA.test(navigator.userAgent)) return true;
    if (window.innerWidth < minWidth) return true;
    if (window.innerHeight > window.innerWidth) return true; // portrait
    return false;
  }

  function apply() {
    var blocked = isBlocked();
    gate.hidden = !blocked;
    viewport.style.visibility = blocked ? "hidden" : "visible";
    document.documentElement.classList.toggle("is-gated", blocked);
  }

  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  apply();

  window.HUB_ENV_GATE = { isBlocked: isBlocked };
})();
