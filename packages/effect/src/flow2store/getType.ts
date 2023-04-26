import { includes, map, pipe, split, fromPairs, filter } from 'ramda';
import { isNotEmpty } from '../utils/isNotEmpty';
import {toBoolean} from '@/operator/toBoolean';

const typesmap: string[] = ['ajax', 'click', 'load', 'params'];

export function getType(str: string) {
  if (includes(str, typesmap)) {
    return {
      type: str,
    };
  } else if (/^([a-z]+=[^,]+,*)+$/g.test(str)) {
    return {
      type: 'params',
      options: pipe<any, any, any, any, any>(
        split(','),
        filter(isNotEmpty),
        map(pipe(
          split('='),
          map(toBoolean)
        )),
        fromPairs,
      )(str),
    };
  } else if (/[a-z]+:/g.test(str)) {
    const list = str.split(':');
    return {
      type: list[0],
      option: list[1],
      param: list[2],
    };
  } else {
    return {
      type: 'options',
    };
  }
}
