import {useState, useMemo, useEffect} from 'react';
import { Subject } from "rxjs";
import { takeUntil, switchMap, map } from "rxjs/operators";

export function useDraggable() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const up$ = useMemo(() => new Subject(), []);
  const down$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    const callBack = () => up$.next(null);
    document.addEventListener("mouseup", callBack);

    return () => document.removeEventListener("mouseup", callBack);
  }, [up$]);

  // useEffect(() => {
  //   const s = down$
  //     .pipe(
  //       switchMap(([offsetX, offsetY]: any) => {
  //         return mousePos$.pipe(
  //           map(([x, y]) => [x - offsetX, y - offsetY]), // Apply offset
  //           map((point) => point.map((p) => Math.max(0, p))), // Limit
  //           takeUntil(up$)
  //         );
  //       })
  //     )
  //     .subscribe(([x, y]) => {
  //       setPosition({ top: y, left: x });
  //     });

  //   return () => s.unsubscribe();
  // }, [up$, down$, setPosition]);

  return {
    position,
    down$
  }
}
