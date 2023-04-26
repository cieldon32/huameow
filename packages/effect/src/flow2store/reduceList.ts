
import {
  pipe,
  split,
  filter,
} from 'ramda';
import { isNotEmpty } from '@/utils/isNotEmpty';
import {modifyFrom} from './modifyFrom';
import {modifyTo} from './modifyTo';

export function reduceList(list: any[]) {
  const reduceFlow = (flow: string) => {
    const list: string[] = pipe(split(' '), filter(isNotEmpty))(flow);
    const from = pipe(
      split(':'),
      modifyFrom,
    )(list[0]);
    const to = pipe(
      split(':'),
      modifyTo
    )(list[2]);
    return {
      from,
      to,
    };
  };
  const data = (list as unknown as string[][]).map((item) => item.map((flow: string) => {
    return reduceFlow(flow)
  }));
  console.log('reduceList', data)
  return data;
}
