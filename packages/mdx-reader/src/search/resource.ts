import { concatMap, Observable, from, map, tap, catchError, scan, of, skipWhile } from 'rxjs';
import {mdd} from './mdd';
import {sliceFile} from '../parse/sliceFile';
import {findResource} from './findResource';

export function resource(mdd$: Observable<any>, query: string): Observable<any> {
  return mdd$.pipe(
    mdd(query),
    tap(res => console.log('resource 1', res)),
    map((res: any) => {
      if(res.candidates && res.candidates.length) {
        return Object.assign(res, {candidates: res.candidates[0]})
      } else {
        throw Object.assign(res, {message: `*RESOURCE NOT FOUND* ${query}`, noResource: true, candidates: null})
      }
    }),
    catchError((error) => of(error).pipe(
      tap(({message}: any) => console.log(message)),
    )),
    concatMap(({file, candidates, blockTable, ...rest}: any) => {
      if(candidates) {
        const block = blockTable.find(candidates.offset);
        const subject$ = sliceFile(file, block.comp_offset, block.comp_offset + block.comp_size);
        return subject$.pipe(
          map((buffer: ArrayBuffer) => Object.assign(
            {file, block, ...rest},
            {slicedKeyBlock: {buffer, offset: block.comp_offset + block.comp_size}}
          )),
          findResource
        )
      } else {
        return of({file, candidates, blockTable, ...rest})
      }

    }),
  )
}
