import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    peerDepsExternal(), // này sẽ auto exclude peerDependencies
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: ['.js', '.jsx'],
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
  ],
  // QUAN TRỌNG: external này phải match chính xác
  external: (id) => {
    return id === 'react' || id === 'react-dom' || id.startsWith('react/');
  }
};