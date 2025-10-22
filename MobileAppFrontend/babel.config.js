// MobileAppFrontend/babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // This plugin makes the '@/' alias work
      [
        'module-resolver',
        {
          root: ['./'], // The root is the current folder
          alias: {
            '@': './', // '@/' means the root
          },
        },
      ],
    ],
  };
};