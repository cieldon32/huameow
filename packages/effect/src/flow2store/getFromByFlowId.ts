import {pipe, map, flatten, values, propEq, filter, head} from 'ramda';

export function getFromByFlowId(id: string, list: any) {
  return pipe(
    map(values),
    flatten,
    filter((item: any) => propEq(id, 'flowId', item) && item.name),
    head
  )(list);
}
