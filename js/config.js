/* config.js — project configuration (single source of truth) */
window.HUB_CONFIG = {
  stage: {
    width: 1920,
    height: 1080
  },

  // CTA contents (§11) — number keys 1/2/3 map to these in order
  contents: [
    {
      key: "1",
      index: "01",
      title: "솔루션 소개",
      url: "https://gojump0713.github.io/PPT_Native"
    },
    {
      key: "2",
      index: "02",
      title: "구축 사례",
      url: "https://gojump0713.github.io/PPT_Native2"
    },
    {
      key: "3",
      index: "03",
      title: "도입 효과",
      url: "https://gojump0713.github.io/PPT_ART"
    }
  ],

  // PC-only gate thresholds (§18)
  gate: {
    minWidth: 1024
  },

  // Magnetic hover limits (§12.3)
  magnetic: {
    buttonMax: 3, // px
    textMax: 6 // px
  }
};
