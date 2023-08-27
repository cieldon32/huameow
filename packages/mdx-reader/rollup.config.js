import path from 'path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const resolveFile = function(filePath) {
  return path.join(__dirname, '.', filePath)
}

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
import pkg from './package.json';
const formats = {
  commonjs: {
    format: 'cjs',
    file: pkg.main,
    sourcemap: 'inline',
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
  esm: {
    format: 'esm',
    file: pkg.module,
    sourcemap: 'inline',
    exports: 'named',
  },
  umd: {
    format: 'umd',
    file: pkg.browser,
    name: pkg.name,
    sourcemap: true,
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
  },
};
export default {
  input: resolveFile('src/index.ts'),
  output: [formats.esm, formats.commonjs],
  external: [
    'react',
    'react-dom',
  ],
  plugins: [
    builtins(),
    // 告诉 Rollup 如何查找模块
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      browser: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),

    // 将CommonJS 模块转换成es6模块
    commonjs(),
    json()
  ]
}
