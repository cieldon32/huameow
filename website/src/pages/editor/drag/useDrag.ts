import React, { useRef, useLayoutEffect } from "react";
import { fromEvent, Observable } from "rxjs";
import {createDragObservable} from './createDragObservable';

export function useDraggable(draggableRef: React.RefObject<HTMLElement>) {
  let drag$ = useRef<Observable<DragEvent>>(null);
  useLayoutEffect(() => {
    if (!draggableRef.current) {
      return () => {};
    }
    const down$ = fromEvent<PointerEvent>(draggableRef.current, "pointerdown");
    const move$ = fromEvent<PointerEvent>(document, "pointermove");
    const up$ = fromEvent<PointerEvent>(document, "pointerup");
    drag$.current = createDragObservable(up$, down$, move$);
  }, [draggableRef]);

  return drag$;
}
