// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

module.exports = () => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts = ["glb", "gltf", "png", "jpg", "hdr"];
  config.resolver.sourceExts = ["js", "json", "ts", "tsx", "cjs", "mjs"];

  return config;
};
