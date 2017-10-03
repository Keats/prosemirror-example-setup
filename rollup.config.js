
module.exports = {
  input: "./src/index.js",
  output: {format: "iife", file: "dist/index.js", name: "pm"},
  sourcemap: "inline",
  plugins: [
    require("rollup-plugin-node-resolve")({
      main: true,
      browser: true,
    }),
    require("rollup-plugin-commonjs")(),
    require("rollup-plugin-buble")(),
  ],
};
