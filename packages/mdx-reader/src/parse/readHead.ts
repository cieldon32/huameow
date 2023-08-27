import { Observable } from 'rxjs';
import {scanner} from './scanner';

export const readHead = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, next, ...rest}: any) => {
          const sca = scanner(buffer);
          observer.next({
            ...rest,
            buffer,
            next: sca.readInt()
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
