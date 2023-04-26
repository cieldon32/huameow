import {
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { tap } from 'rxjs/operators';

// import { From } from './interface';
import {transformTo} from './transformTo';
import {getFromByFlowId} from './getFromByFlowId';
import {TargetMap} from './constants';
import {EventMap} from './constants';


type Store = Record<string, Observable<any> | any>;

export function transformToStore(data: any, apis: any) {
  let result: Store = {};


  const reduceData = ({ from, to }: any, list: any[]) => {
    const newFrom: any = !from.name ? getFromByFlowId(from.flowId, list) : from;
    const {name, eventName} = newFrom;
    let from$: any;
    result['load'] = result['load'] || {};
    if (eventName) {
      const $target = name
        ? TargetMap[name] ||
          document.querySelectorAll(`[data-name=${name}], [name=${name}]`)
        : document;
      from$ = EventMap[eventName]($target, eventName).pipe(
        tap(() => console.log('fromEvent', name, eventName)),
      );
    } else {
      from$ = name
        ? result[name] || result['load'][name]
        : new BehaviorSubject({});
      from$ = from$ || new BehaviorSubject({});
    }
    to.map((toItem: any) => {
      transformTo({
        to: toItem,
        from: newFrom,
        from$,
        result,
        apis
      })
    })

  };
  data.map((list: any[][]) => list.map((item: any) => reduceData(item, list)))
  console.log('transformToStore', result)
  return result;
}
