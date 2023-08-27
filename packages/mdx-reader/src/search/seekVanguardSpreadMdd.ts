import { Observable, of } from 'rxjs';
import {matchOffset} from '../utils';
import {UNDEFINED} from '../constant';

export const seekVanguardSpreadMdd = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({query = {}, kdx, word, idx, cachedKeys, ...rest}: any) => {
        const candidates = cachedKeys.list.slice(idx).filter((item: any) => {
          console.log('seekVanguardSpreadMdd', item);
          return item.toLowerCase() === word;
        });

        observer.next({
          ...rest,
          candidates
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
