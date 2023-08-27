import { Observable } from 'rxjs';
import {scanner} from '../parse/scanner';

export const slicedKeyBlockThen = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({buffer, kdx = {}, searchTextLen, decoder, bpu, ...rest}: any) => {
        let sca = scanner(buffer, {searchTextLen, decoder, bpu});
        const list = kdx.num_entries ? Array(kdx.num_entries) : [];
        sca.forward(kdx.offset);
        sca = sca.readBlock(kdx.comp_size, kdx.decomp_size);
        for (let i = 0; i < kdx.num_entries; i++) {
          let offset = sca.readNum();
          list[i] = new Object(sca.readText());
          list[i].offset = offset;
          if (i > 0) {
            list[i - 1].size = offset - list[i - 1].offset;
          }
        }
        const cachedKeys = {list: list, pilot: kdx.first_word};
        observer.next({
          ...rest,
          buffer, kdx, searchTextLen, decoder, bpu,
          cachedKeys
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
