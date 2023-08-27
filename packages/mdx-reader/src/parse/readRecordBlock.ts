import { Observable } from 'rxjs';
import {scanner} from './scanner';
import {createRecordBlockTable} from '../utils/createRecordBlockTable';

export const readRecordBlock = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, offset, record_summary, ...rest}: any) => {
          const sca = scanner(buffer);
          const size = record_summary.num_blocks;
          const recordIndex = Array(size);
          let pos0 = record_summary.block_pos
          let pos1 = 0;
          const blockTable = createRecordBlockTable();
          blockTable.alloc(size + 1);
          for (let i = 0, rdx; i < size; i++) {
            recordIndex[i] = rdx = {
              comp_size:   sca.readNum(),
              decomp_size: sca.readNum()
            };
            blockTable.put(pos0, pos1);
            pos0 += rdx.comp_size;
            pos1 += rdx.decomp_size;
          }
          blockTable.put(pos0, pos1);
          observer.next({
            ...rest,
            blockTable,
            recordIndex,
            buffer, offset, record_summary
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
