import {
  fromEvent,
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { tap } from 'rxjs/operators';

import { From } from './interface';
import {transformTo} from './transformTo';
import {getNameByFlowId} from './getNameByFlowId';

const TargetMap: Record<string, any> = {
  window: window,
  document: document,
};



type Store = Record<string, Observable<any> | any>;

export function transformToStore(data: any, apis: any) {
  let result: Store = {};


  const reduceData = ({ from, to }: any, list: any[]) => {
    const { name, flowId } = from as From;
    const target = name || getNameByFlowId(flowId, list);
    const eventName = from.eventName || (target === 'window' ? 'load' : '');
    let from$: any;
    let fromName = '';
    result['load'] = result['load'] || {};
    console.log('reduceData',eventName, from, to)
    if (eventName) {
      const $target = target
        ? TargetMap[target] ||
          document.querySelectorAll(`[data-name=${target}], [name=${target}]`)
        : document;
      from$ = fromEvent($target, eventName).pipe(
        tap(() => console.log('fromEvent', target, eventName)),
      );
    } else {
      fromName = target;
      from$ = fromName
        ? result[fromName] || result['load'][fromName]
        : new BehaviorSubject({});
      from$ = from$ || new BehaviorSubject({});
    }

    const isEvent = from.type ? from.type.indexOf('on') === 0 : false;
    to.map((toItem: any) => {
      transformTo({
        to: toItem,
        result, isEvent, apis, fromName: fromName || target,
        from, from$, eventName, data
      })
    })
  };
  data.map((list: any[][]) => list.map((item: any) => reduceData(item, list)))
  console.log('transformToStore', result)
  return result;
}
