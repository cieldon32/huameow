import { Observable, switchMap, map } from 'rxjs';
import { scanner } from '../parse/scanner';

export const findWord = (source$: Observable<any>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({slicedKeyBlock, block, decryptors, offset, searchTextLen, decoder, bpu, ...rest}: any) => {
        const sca = scanner(slicedKeyBlock.buffer, {searchTextLen, decoder, bpu}).readBlock(block.comp_size, block.decomp_size);
        sca.forward(offset - block.decomp_offset);
        let definition = sca.readText();
        const isLink = definition.substring(0, 8) !== '@@@LINK=';
        definition = isLink ? definition : null;
        let newQuery = isLink ? null : definition.substring(8);
        observer.next({
          ...rest,
          definition,
          newQuery,
          slicedKeyBlock, block, decryptors, offset
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
