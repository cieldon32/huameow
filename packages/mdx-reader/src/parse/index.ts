import { Observable, Observer, BehaviorSubject } from 'rxjs';
import {slice} from './slice';
import {readHead} from './readHead';
import {readHeader} from './readHeader';
import {readKeywordSummary} from './readKeywordSummary';
import {readKeywordIndex} from './readKeywordIndex';
import {readRecordSummary} from './readRecordSummary';
import {readRecordBlock} from './readRecordBlock';

export function parse(file: File, ext: string): Observable<any> {
  const file$ = new BehaviorSubject({file});
  return file$.pipe(
    slice(0, 4),
    readHead,
    slice(4, 48),
    readHeader,
    readKeywordSummary,
    slice(),
    readKeywordIndex,
    slice(undefined, 32),
    readRecordSummary,
    slice(),
    readRecordBlock
  );
}
