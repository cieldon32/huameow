import { mergeMap, Observable, map } from 'rxjs';
import {sliceFile} from './sliceFile';

export const slice = (pos?: number, len?: number) => (source$: Observable<any>): Observable<any> => {
  return new Observable(observer => {
    return source$.pipe(
      mergeMap(({file, next = 0, offset = 0, ...rest}: any) => {
        const start = typeof pos !== 'undefined' ? pos : offset;
        const size = len ? len + next : next;
        const subject$ = sliceFile(file, start, start + size);
        return subject$.pipe(
          map((buffer: ArrayBuffer) => Object.assign({file, next, offset, ...rest}, {buffer, offset: start + size}))
        )
      }),
    ).subscribe({
      next: (res: any) => {
        observer.next(res);
      },
    });
  });
}
