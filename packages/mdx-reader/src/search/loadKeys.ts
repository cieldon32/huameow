import { Observable, tap } from 'rxjs';


export const loadKeys = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({cachedKeys, kdx, slicedKeyBlock, ...rest}: any) => {
        if (cachedKeys && cachedKeys.pilot === kdx.first_word) {
          observer.next({
            ...rest,
            cachedKeys,
            kdx
          });
        } else {
          // todo get slicedKeyBlock's value
          observer.next({
            ...rest,
            ...slicedKeyBlock,
            cachedKeys,
            kdx
          });
        }

      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    });
    return () => {
      subscription.unsubscribe();
    }
  })
}
