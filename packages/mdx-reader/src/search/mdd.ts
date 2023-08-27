import { Observable } from 'rxjs';
import { seekVanguard } from './seekVanguard';
import { loadKeys } from './loadKeys';
import {slicedKeyBlockThen} from './slicedKeyBlockThen';
import {seekVanguardThen} from './seekVanguardThen';
import {seekVanguardSpreadMdd} from './seekVanguardSpreadMdd';

export const mdd = (query: string) => (source$: Observable<ArrayBuffer>): Observable<any> => {
  var word = query.trim().toLowerCase();
  word = '\\' + word.replace(/(^[/\\])|([/]$)/, '');
  word = word.replace(/\//g, '\\');
  return source$.pipe(
    seekVanguard(word),
    loadKeys,
    slicedKeyBlockThen,
    seekVanguardThen,
    seekVanguardSpreadMdd
  )
}
