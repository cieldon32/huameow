import React, { useRef, useLayoutEffect, useState } from "react";
import {useDraggable} from './useDrag';

export function DraggableComponent({children}: any) {
  const draggableDivRef = useRef<HTMLDivElement>(null);
  const drag$ = useDraggable(draggableDivRef);
  const [position, setPosition] = useState({})

  useLayoutEffect(() => {
    if (!drag$.current) {
      return () => {};
    }

    const dragSubscription = drag$.current.subscribe(e => {
      if (!draggableDivRef.current) {
        return;
      }

      draggableDivRef.current.style.transform = `translateY(${e.y}px)`;
      setPosition({x: e.x, y: e.y})
    });
    return () => {
      dragSubscription.unsubscribe();
    };
  }, [drag$]);

  return (
    <div
      ref={draggableDivRef}
      style={{ userSelect: "none", padding: "8px", backgroundColor: "#eee" }}
    >
      drag me {JSON.stringify(position)}
      {children}
    </div>
  );
}
