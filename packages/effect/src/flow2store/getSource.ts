import { from } from 'rxjs';
import {
  map as rxjsMap,
  tap,
  switchMap,
  share,
  filter,
} from 'rxjs/operators';
import { toBoolean } from '../operator/toBoolean';

const operatorsMap: Record<string, any> = {
  filter: filter,
};

export function getSource({
  type,
  source$,
  name,
  attrKey,
  attrValue,
  apis,
}: any) {
  if (!source$) {
    console.log('source$', name, type);
    return null;
  }
  let resultSource$ = source$;
  if (type && type === 'ajax') {
    const promise = async () => {
      return await apis?.[name]();
    };
    console.log('promise', name);
    resultSource$ = resultSource$.pipe(
      switchMap(() =>
        from(promise()).pipe(
          rxjsMap((res) => (res.codeNo ? res.data : res)),
          tap((v) => console.log('tap promise', name, v)),
          share(),
          // catchError((err, caught) => {
          //   console.log('err', err);
          //   return caught;
          // }),
        ),
      ),
    );
  } else if (attrKey && attrValue) {
    resultSource$ = resultSource$.pipe(
      rxjsMap(() => ({
        [attrKey as string]: toBoolean(attrValue),
      })),
    );
  } else if (operatorsMap[type]) {
    resultSource$ = resultSource$.pipe(
      tap((v) => console.log('operatorsMap', type, name, v)),
      // operatorsMap[type]((res: any) => res[option] === '')
    );
  } else {
    resultSource$ = resultSource$.pipe(
      rxjsMap((res: any) => ({
        state: {
          [name]: res[name],
        },
      })),
    );
  }
  return resultSource$;
}
