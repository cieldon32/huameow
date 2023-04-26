import {
  merge,
  BehaviorSubject,
} from 'rxjs';
import { map as rxjsMap, tap, mergeWith, filter } from 'rxjs/operators';
import { is, reduce, has, isEmpty } from 'ramda';
import { getSource } from './getSource';

const operatorsMap: Record<string, any> = {
  filter: filter,
};

export function transformTo({
  to, result, isEvent,
  apis, fromName,
  from, from$, eventName, data
}: any) {
  function updateSource(current: any, preName: string, result: any) {
    let sourceData;
    data.some((cur: any) => {
      const preData = data.filter(({ to }: any) => to.name === preName)[0];
      const res =
        cur.to.type !== 'params' &&
        cur.to.type !== 'options' &&
        cur.to.name === preData.from.name;
      if (res) {
        sourceData = cur;
      }
      return res;
    });
    if (!sourceData) {
      return false;
    }
    const { from, to } = sourceData as any;
    if (to.type !== 'params' && to.type !== 'options') {
      let source$ = result[to.name] || result['load'][to.name];
      source$ = source$.pipe(
        rxjsMap((res: any) => ({
          ...res,
          picks: res.picks
            ? reduce(
                (acc: any[], cur: any) => {
                  if (is(String, cur) && cur === preName) {
                    acc.push({
                      [preName]: [current],
                    });
                  } else if (is(Object, cur) && has(preName, cur)) {
                    acc.push({
                      [preName]: (cur[preName] as string[]).concat([current]),
                    });
                  } else {
                    acc.push(cur);
                  }
                  return acc;
                },
                [],
                res.picks,
              )
            : [
                {
                  [preName]: [current],
                },
              ],
        })),
      );
      if (from.name === 'window') {
        result['load'][to.name] = source$;
      } else {
        result[to.name] = source$;
      }
    }
    return result;
  }
  const { attrKey, attrValue, name: toName, type, options, option } = to;

  const onEvent = async function (_params: any) {
    let target$ = result[toName] || result['load'][toName];
    if (!target$) {
      target$ = new BehaviorSubject({});
      result[toName] = target$;
    }
    if (options && options.length) {
      target$.next(options);
    } else if (operatorsMap[type]) {
      // let operactor;
      // switch (type) {
      //   case 'filter': {
      //     operactor = operatorsMap[type]((res: any) => {
      //       console.log('filter', res);
      //       return res[param][option]?.indexOf(params) >= 0;
      //     });
      //   }
      // }
      // if(operactor) {
      //   target$ = target$.pipe(
      //     rxjsMap((res: any) => {
      //       const list = res[param];
      //       return {
      //         ...res,
      //         [param]: list.filter((item: any) => item[option].indexOf(params) >= 0)
      //       }
      //     }),
      //     tap((v) => console.log('tap onEvent', v, params)),
      //     takeLast(1),
      //   )
      //   // const data = await lastValueFrom(target$);
      //   // console.log('lastValueFrom', data)
      //   lastValueFrom(target$).then((res) => {
      //     console.log('lastValueFrom', res)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // }
    } else if (type === 'ajax') {
      target$ = target$.pipe(
        mergeWith(
          getSource({
            source$: target$,
            attrKey,
            attrValue,
            name,
            type,
            option,
            apis
          }),
        ),
      );
    }
  };

  if (type !== 'params') {
    if (!isEvent) {
      let source$ = type === 'options' ? result[fromName] : result[toName];
      if (source$) {
        if (type !== 'options') {
          source$ = source$.pipe(
            mergeWith(
              getSource({
                source$: from$,
                attrKey,
                attrValue,
                name,
                type,
                option,
              }),
            ),
          );
        }
      } else {
        source$ = getSource({
          source$: from$,
          attrKey,
          attrValue,
          name,
          type,
        });
      }
      if (eventName === 'load') {
        result['load'] = Object.assign({ [toName]: source$ }, result['load']);
      } else if (type === 'options') {
        result = updateSource(to, fromName, result);
      } else {
        result[toName] = source$;
      }
    } else {
      let source$ = from$.pipe(
        rxjsMap(() => {
          return {
            [from.type]: onEvent,
          };
        }),
        tap((v) => console.log('tap 2', name, v)),
      );
      result['load'][fromName] = source$;
      if (result[toName] || result['load'][toName]) {
        if (result[toName]) {
          source$ = merge(result[toName], source$);
          result[toName] = new BehaviorSubject(null).pipe(
            tap((v) => console.log('tap hhh', name, v)),
          );
          source$.subscribe(result[toName]);
        } else if (result['load'][toName]) {
          source$ = merge(result['load'][toName], source$);
          result['load'][toName] = new BehaviorSubject(null).pipe(
            tap((v) => console.log('tap hhh', toName, v)),
          );
          source$.subscribe(result['load'][toName]);
        }
      } else {
        result[toName] = new BehaviorSubject(null);
      }
    }
  } else {
    if (from$) {
      let source$ = from$.pipe(
        rxjsMap((res: any) => {
          if (options && !isEmpty(options)) {
            if (isEvent) {
              return {
                [from.type]: onEvent,
              };
            } else {
              return options;
            }
          } else {
            return {
              ...res,
              ...(!options && {
                picks: [...(res?.picks || []), name],
              }),
            };
          }
        }),
        tap((v) => console.log('tap click 1', name, v)),
      );
      if (result['load'][fromName]) {
        result['load'] = Object.assign(result['load'], {
          [fromName]: source$,
        });
      }
      if (isEvent) {
        result['load'][fromName] = source$;
      }
      if (result[toName]) {
        source$ = merge(result[toName], source$);
        result[toName] = new BehaviorSubject(null).pipe(
          tap((v) => {
            console.log('tap ttt', toName, v);
          }),
        );
        source$.subscribe(result[toName]);
      } else {
        result[toName] = new BehaviorSubject(null);
      }
    }
  }
}
