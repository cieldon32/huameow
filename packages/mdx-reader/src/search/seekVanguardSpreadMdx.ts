import { Observable, of } from 'rxjs';
import {matchOffset} from '../utils';
import {UNDEFINED} from '../constant';

export const seekVanguardSpreadMdx = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({query = {}, kdx, word, idx, cachedKeys, ...rest}: any) => {
        let list = cachedKeys.list.slice(idx);
        const offset = query.offset;
        if (offset !== UNDEFINED) {
          list = matchOffset(list, offset);
        } else {
          list = list.filter(function(el: any) { return el.toLowerCase() === word; });
        }
        observer.next({
          ...rest,
          list
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
