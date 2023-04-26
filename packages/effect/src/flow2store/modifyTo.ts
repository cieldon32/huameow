import { curry} from 'ramda';
import {getName} from './getName';
import {getType} from './getType';
import {FnsMap} from './constants';

export const modifyTo: any = curry(function(data: string[]) {
  const {name, flowId} = getName(data[0]);
  const result = [];
  if(name && FnsMap[name]) {
    const fnResult = FnsMap[name](data[1]);
    result.push({
      name: fnResult,
      flowId,
      ...(data[2] && getType(data[2].replace(')', '')))
    });
  } else {
    result.push(
      {
        name,
        flowId,
        ...(data[1] && getType(data[1].replace(')', '')))
      }
    )
  }
  return result;
});
