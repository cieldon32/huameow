import path from 'path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

const resolveFile = function(filePath) {
  return path.join(__dirname, '.', filePath)
}

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: resolveFile('demo/index.tsx'),
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
    globals: {
    }
  },
  plugins: [
    builtins(),
    // 告诉 Rollup 如何查找模块
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),

    // 将CommonJS 模块转换成es6模块
    commonjs(),
    json(),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" })
  ]
}
