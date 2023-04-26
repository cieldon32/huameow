import { curry} from 'ramda';
import {getName} from './getName';
import {EventMap} from './constants';


export const modifyFrom: any = curry(function(data: string[]) {
  const type = data[1] ? data[1].replace(')', '') : ''
  return {
    ...getName(data[0]),
    ...(type && {
      type: EventMap[type] || type,
      ...(EventMap[type] && {
        eventName: type,
      }),
    })
  };
});
