/* video-controller.js — hero video lifecycle (§6, §15, §16)
   - fade in on canplay (800ms)
   - infinite loop while page visible; pause when tab hidden
   - on failure: keep poster + gradient, no user-facing error */
(function () {
  "use strict";

  var video = document.getElementById("heroVideo");
  var failed = false;

  function markReady() {
    if (failed) return;
    video.classList.add("is-ready");
  }

  function markFailed(reason) {
    failed = true;
    document.body.classList.add("video-failed");
    // Console only — never surface an error to the audience (§16)
    console.warn("[hub] hero video unavailable, poster fallback active:", reason);
  }

  if (video.readyState >= 3) {
    markReady();
  } else {
    video.addEventListener("canplay", markReady, { once: true });
  }

  video.addEventListener("error", function () {
    markFailed(video.error ? "mediaError code " + video.error.code : "unknown");
  });

  // Autoplay guard — muted autoplay is allowed in Chrome/Edge, but retry once anyway
  var playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.catch(function () {
      video.muted = true;
      video.play().catch(function (err) {
        markFailed("autoplay rejected: " + err);
      });
    });
  }

  // §15 — pause rendering when tab is hidden, resume on return
  document.addEventListener("visibilitychange", function () {
    if (failed) return;
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(function () { /* keep poster */ });
    }
  });
})();
