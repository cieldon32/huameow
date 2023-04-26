import {merge} from 'rxjs';
import { map as rxjsMap, tap } from 'rxjs/operators';
import {EventMap} from './constants';

export function transformTo({
  to, result, from$, from
}: any) {

  const {name, type, options} = to;
  const isEvent = !!EventMap[from.eventName] && from.eventName !== 'load';
  console.log(' transformTo',from, to,'isEvent',  isEvent)

  switch(type) {
    case 'params' : {
      if(from$) {
        const source$ = from$.pipe(
          rxjsMap(() => options),
          tap((v) => console.log('tap click 1', name, v)),
        );
        if(from.eventName === 'load') {
          if(result['load'][name]) {
            result['load'] = Object.assign(result['load'], {
              [name]: source$,
            });
          } else {
            result['load'][name] = source$;
          }
        } else {
          if(result[name]) {
            result[name] = merge(result[name], source$);
          } else if(result['load'][name]) {
            result[name] = merge(result['load'][name], source$);;
          }
          result['load'][name] = null
        }
      }
      break;
    }
    default : {
      break;
    }
  }
}
