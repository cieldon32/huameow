import { concatMap, Observable, from, map, tap, catchError, scan } from 'rxjs';
import {mdx} from './mdx';
import {findWord} from './findWord';
import {sliceFile} from '../parse/sliceFile';

export function search(mdx$: Observable<any>, query: string): Observable<any> {
  return mdx$.pipe(
    mdx(query),
    concatMap(({list, blockTable, slicedKeyBlock, decryptors, file, searchTextLen, decoder, bpu}: any) => from(list).pipe(
      map((res: any) => Object.assign(res, {blockTable, slicedKeyBlock, decryptors, file, searchTextLen, decoder, bpu})),
      map((res: any) => Object.assign(res, {block: res.blockTable.find(res.offset)})),
      concatMap(({file, block, ...rest}: any) => {
        const subject$ = sliceFile(file, block.comp_offset, block.comp_offset + block.comp_size);
        return subject$.pipe(
          map((buffer: ArrayBuffer) => Object.assign({file, block, ...rest}, {slicedKeyBlock: {buffer, offset: block.comp_offset + block.comp_size}})),
          findWord,
          map((res: any) => {
            if(res.newQuery) {
              throw res.newQuery;
            } else {
              return res;
            }
          }),
          catchError((error) => mdx(error)(mdx$)),

        )
      }),
      scan((pre: any, cur: any) => {
        const result = pre.result || [pre.definition];
        result.push(cur.definition);
        return Object.assign(pre, {result});
      }),
      map((res: any) => Object.assign(res, {result: res.result && res.result.length ? res.result : [res.definition]})),
    )),
  )
}
