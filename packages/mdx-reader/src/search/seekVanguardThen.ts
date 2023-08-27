import { Observable } from 'rxjs';
import {shrink} from './shrink';

export const seekVanguardThen = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, kdx, adaptKey, phrase, cachedKeys, ...rest}: any) => {
        const list = cachedKeys.list
        let idx = shrink(adaptKey, list, phrase);
        while (idx > 0) {
          if (adaptKey(list[--idx]) !== adaptKey(phrase)) {
            idx++;
            break;
          }
        }
        observer.next({
          ...rest,
          cachedKeys,
          idx
        });
      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => {
      subscription.unsubscribe();
    }
  })
}