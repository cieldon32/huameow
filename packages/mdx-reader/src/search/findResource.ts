import { Observable, of } from 'rxjs';
import { scanner } from '../parse/scanner';

export const findResource = (source$: Observable<ArrayBuffer>): Observable<any> => {
  return new Observable(observer => {
    const subscription = source$.subscribe({
      next: ({slicedKeyBlock, block, candidates, ...rest}: any) => {
        const sca = scanner(slicedKeyBlock.buffer).readBlock(block.comp_size, block.decomp_size);
        sca.forward(candidates.offset - block.decomp_offset);
        const blob = sca.readRaw(candidates.size);
        const resource = URL.createObjectURL(blob);
        observer.next({
          ...rest,
          slicedKeyBlock, block, candidates,
          resource
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
