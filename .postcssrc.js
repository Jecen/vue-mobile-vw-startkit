// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "precss": {},
    "postcss-px-to-viewport": {
      "unitToConvert": 'px',
      "viewportWidth": 750, // 设计稿尺寸
      "unitPrecision": 5,
      "viewportUnit": 'vw',
      "fontViewportUnit": 'vw',  // vmin is more suitable.
      "selectorBlackList": ['ig'],
      "minPixelValue": 1,
      "mediaQuery": false
    },
    "postcss-aspect-ratio": {},
    "postcss-write-svg": {}
  }
}
