import {
  pipe,
  map,
  split,
  flatten,
  filter,
  // trim
 } from 'ramda';
import { pickWhen } from '@/operator/pickWhen';
import { isNotEmpty } from '@/utils/isNotEmpty';

export function reduceNode(node: any) {
  const isFlow = (n: string) => {
    return !new RegExp(/(<("[^"]*"|'[^']*'|[^'">])*>)|(flowchart*)/g).test(n);
  };

  const reduceFlow = (data: any) =>
      pipe(split('\n'), flatten, filter(isNotEmpty), filter(isFlow))(data);

  const fn =  (acc: any[], cur: any) => {
    const texts = pipe<any, any, any, any>(
      split('<div class="mermaid">'),
      filter(isNotEmpty),
      map(reduceFlow),
    )(cur.value);
    return acc.concat(texts);
  }

  const list = pipe<any, any>(
    pickWhen('html', fn),
  )([node]);
  return list;
}
