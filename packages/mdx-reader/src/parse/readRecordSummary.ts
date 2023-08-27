import { Observable } from 'rxjs';
import {scanner} from './scanner';

export const readRecordSummary = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, pos, offset, ...rest}: any) => {
          const sca = scanner(buffer);
          const record_summary: Record<string, number> = {
            num_blocks:   sca.readNum(),
            num_entries:  sca.readNum(),
            index_len:    sca.readNum(),
            blocks_len:   sca.readNum(),
            len:          sca.offset(),
          };
          record_summary.block_pos = pos + record_summary.index_len + record_summary.len;
          observer.next({
            ...rest,
            record_summary,
            offset: pos + record_summary.len,
            next: record_summary.index_len,
            buffer
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
