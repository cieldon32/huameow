import nodeResolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import progress from 'rollup-plugin-progress';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const formats = {
  commonjs: {
    format: 'cjs',
    file: pkg.main,
    sourcemap: true,
    exports: 'named',
  },
  esm: {
    format: 'esm',
    file: pkg.module,
    sourcemap: true,
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

const config = {
  input: './src/index.ts',
  inlineDynamicImports: true,
  output: [formats.esm, formats.commonjs],
  external: ['react', 'react-dom'],
  plugins: [
    clear({
      targets: ['lib'],
    }),
    progress({
      clearLine: false,
    }),
    replace({
      __VERSION__: pkg.version,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    nodeResolver(),
    commonjs(),
    typescript(),
    json(),
    nodePolyfills(),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
  },
};

if (isProd) {
  const file = formats.umd.file;

  config.output.push({
    ...formats.umd,
    file,
    plugins: [terser()],
  });
}

export default config;
