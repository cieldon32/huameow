import {pipe, map, flatten, values, propEq, filter, prop, join} from 'ramda';

export function getNameByFlowId(id: string, list: any) {
  const name = pipe(
    map(values),
    flatten,
    filter((item: any) => propEq(id, 'flowId', item) && item.name),
    map(prop('name')),
    join('')
  )(list);
  return name;
}
