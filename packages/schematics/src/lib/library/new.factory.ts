import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  mergeWith,
  move,
  Rule,
  Source,
  template,
  url,
} from '@angular-devkit/schematics';
import { basename, parse } from 'path';
import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_LANGUAGE,
  DEFAULT_VERSION,
} from '../defaults';
import { LibraryOptions } from './library.schema';

export function newLibrary(options: LibraryOptions): Rule {
  console.log('newLibrary', newLibrary)
  options.name = strings.dasherize(options.name);

  const path =
    !options.directory || options.directory === 'undefined'
      ? options.name
      : options.directory;

  return mergeWith(generate(options, path));
}

function generate(options: LibraryOptions, path: string): Source {
  const lang = options.language || '';
  return apply(url('./files' as Path), [
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ]);
}
