/* main.js — bootstrap + entry motion timeline (§14) */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  // Entry motion runs once (§14). CSS transition delays implement the
  // 0.25 / 0.50 / 0.75 / 1.00 / 1.10 / 1.20s timeline.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add("is-entered");
    });
  });

  // After the last entry transition (1.20s delay + 0.55s duration),
  // return CTA transitions to hover/active behaviour.
  window.setTimeout(function () {
    document.body.classList.add("is-settled");
  }, 1900);
})();
