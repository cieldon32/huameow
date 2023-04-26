import nodeResolver from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import progress from 'rollup-plugin-progress';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import path from "path";

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const isProd = process.env.NODE_ENV === 'production';

const formats = {
  commonjs: {
    format: 'cjs',
    file: pkg.main,
    sourcemap: 'inline',
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'antd': 'antd',
      'moment': 'moment',
      '@ant-design/icons': 'icons'
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
      'antd': 'antd',
      'moment': 'moment',
      '@ant-design/icons': 'icons'
    },
  },
};

const config = {
  input: './src/index.ts',
  inlineDynamicImports: true,
  output: [formats.esm, formats.commonjs],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'antd',
    'moment',
    '@ant-design/icons',
  ],
  plugins: [
    clear({
      targets: ['lib', 'es'],
    }),
    nodeResolver(),
    progress({
      clearLine: false,
    }),
    replace({
      __VERSION__: pkg.version,
    }),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use : [
        ['sass', {
          includePaths: [
            path.resolve(__dirname, "node_modules"),
          ],
        }],
        ['less', { javascriptEnabled: true }]
      ],
      plugins: [
        postcssImport(),
        autoprefixer(),
        cssnano(),
      ]
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    commonjs(),


    json(),
    nodePolyfills(),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
  },
};

// if (isProd) {
  // const file = formats.umd.file;

  // config.output.push({
  //   ...formats.umd,
  //   file,
  //   plugins: [terser()],
  // });
// }

export default config;
