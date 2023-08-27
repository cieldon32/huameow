import { Observable, Observer } from 'rxjs';
import {scanner} from './scanner';

export const readKeywordSummary = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, file, next = 0, offset, ...rest}: any) => {
          const sca = scanner(buffer);
          sca.forward(offset);
          const data = {
            num_blocks: sca.readNum(),
            num_entries: sca.readNum(),
            key_index_decomp_len: sca.readNum(),
            key_index_comp_len: sca.readNum(),
            key_blocks_len: sca.readNum(),
            chksum: sca.checksum_v2(),
            len: sca.offset() - next,
          }
          observer.next({
            ...rest,
            ...data,
            next: data.key_index_comp_len,
            file,
            offset: offset + data.len,
            buffer,
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
