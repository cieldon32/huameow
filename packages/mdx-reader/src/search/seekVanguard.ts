import { Observable } from 'rxjs';
import {reduce} from './reduce';

export const seekVanguard = (query: string) => (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({adaptKey, keywordIndex, ...rest}: any) => {
        const word = query.trim().toLowerCase();
        const phrase = adaptKey(word);
        let kdx = reduce(adaptKey, keywordIndex, phrase);
        // look back for the first record block containing keyword for the specified phrase
        if (phrase <= adaptKey(kdx.last_word)) {
          var index = kdx.index - 1, prev;
          while (prev = keywordIndex[index]) {
            if (adaptKey(prev.last_word) !== adaptKey(kdx.last_word)) {
              break;
            }
            kdx = prev;
            index--;
          }
        }
        observer.next({
          ...rest,
          kdx,
          phrase,
          adaptKey,
          keywordIndex,
          query,
          word
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
