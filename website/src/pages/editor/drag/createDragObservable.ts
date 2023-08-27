import { Observable } from "rxjs";
import { takeUntil, mergeMap, map } from "rxjs/operators";

type DragEvent = { x: number; y: number };
export function createDragObservable<T extends PointerEvent>(
  up$: Observable<T>,
  down$: Observable<T>,
  move$: Observable<T>
): Observable<DragEvent> {
  let startPosition: DragEvent;
  return down$.pipe(
    mergeMap(e => {
      startPosition = startPosition || { x: e.pageX, y: e.pageY };
      return move$.pipe(
        takeUntil(up$),
        map(e => ({
          x: e.pageX - startPosition.x,
          y: e.pageY - startPosition.y
        }))
      );
    })
  );
}
