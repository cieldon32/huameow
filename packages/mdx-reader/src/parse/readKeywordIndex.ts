import { Observable, map, switchMap, skipWhile } from 'rxjs';
import {scanner} from './scanner';
import {conseq} from '../utils';
import {sliceFile} from './sliceFile';

export const readKeywordIndex = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.pipe(
      switchMap(({file, offset, key_blocks_len, ...rest}: any) => {
        const subject$ = sliceFile(file, offset,  offset + key_blocks_len);
        return subject$.pipe(
          map((buffer: ArrayBuffer) => Object.assign({file, offset, key_blocks_len, ...rest}, {slicedKeyBlock: {buffer, offset: offset + key_blocks_len}})),
          skipWhile(({slicedKeyBlock}: any) => slicedKeyBlock.buffer === null || slicedKeyBlock.buffer === undefined)
        )
      }),
    ).subscribe({
      next: ({
        buffer,
        key_index_comp_len,
        key_index_decomp_len,
        decryptors = [false, false],
        searchTextLen,
        num_blocks,
        v2,
        bpu,
        decoder,
        tail,
        file,
      ...rest}: any) => {
          const sca = scanner(buffer, {v2, bpu, decoder, tail, searchTextLen}).readBlock(key_index_comp_len, key_index_decomp_len, decryptors[1]);
          const keywordIndex = Array(num_blocks);
          let offset = 0;
          for (let i = 0, size; i < num_blocks; i++) {
            keywordIndex[i] = {
              num_entries: conseq(sca.readNum(), size = sca.readShort()),
              first_word:  conseq(sca.readTextSized(size), size = sca.readShort()),
              last_word:   sca.readTextSized(size),
              comp_size:   size = sca.readNum(),
              decomp_size: sca.readNum(),
              offset: offset,
              index: i
            };
            offset += size;
          }
          observer.next({
            ...rest,
            file,
            buffer,
            key_index_comp_len,
            key_index_decomp_len,
            decryptors,
            searchTextLen,
            num_blocks,
            v2,
            bpu,
            decoder,
            tail,
            keywordIndex,
            offset: rest.offset + rest.key_blocks_len,
            pos: rest.offset + rest.key_blocks_len,
            next: 0
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
