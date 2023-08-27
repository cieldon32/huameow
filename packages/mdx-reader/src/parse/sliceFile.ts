import { BehaviorSubject, Observable, skipWhile, tap } from 'rxjs';

export const sliceFile = (file: File, offset: number, len: number): Observable<ArrayBuffer> => {
  const file$ = new BehaviorSubject(null as unknown as ArrayBuffer);
  file$.subscribe(() => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file.slice(offset, len));
    reader.onload = () => {
      if(reader.result) {
        file$.next(reader.result as ArrayBuffer)
      }

    }
    reader.onloadend = () => {
      file$.complete()
    }
    reader.onerror = (err) => {
      file$.error(err)
    }
    reader.onabort = () => {
      file$.error("遇到意外退出")
    }
  })

  return file$.pipe(
    skipWhile((buffer: ArrayBuffer) => buffer === null || buffer === undefined || buffer.byteLength <= 0),
  );
}
