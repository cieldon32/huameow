import { Observable } from 'rxjs';
import { seekVanguard } from './seekVanguard';
import { loadKeys } from './loadKeys';
import {slicedKeyBlockThen} from './slicedKeyBlockThen';
import {seekVanguardThen} from './seekVanguardThen';
import {seekVanguardSpreadMdx} from './seekVanguardSpreadMdx';

export const mdx = (query: string) => (source$: Observable<ArrayBuffer>): Observable<any> => {
  return source$.pipe(
    seekVanguard(query),
    loadKeys,
    slicedKeyBlockThen,
    seekVanguardThen,
    seekVanguardSpreadMdx,
  )
}
