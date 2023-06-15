import { useEffect, useMemo, useState, useRef } from 'react';
import classnames from 'classnames';
import gasp from "gsap";
import { EASING } from '@/motion';
import {
  CSS_CLASSES,
  State,
  SOFT_EDGE_CONTAINER_RATIO,
  SOFT_EDGE_MINIMUM_SIZE,
  INITIAL_ORIGIN_SCALE,
  PADDING,
  ANIMATION_FILL,
  PRESS_GROW_MS,
  PRESS_PSEUDO
} from './constants';
import './index.scss';

export const Ripple = ({ round, parent, className }: any) => {
  const ref = useRef(null);
  const [state, setState] = useState(State.INACTIVE);
  const [hovered, setHovered] = useState(false);
  const [actived, setActived] = useState(false);
  const root = classnames(CSS_CLASSES.ROOT, className, {});
  const surface = useMemo(() => {
    return classnames(
      CSS_CLASSES.SURFACE,
      {},
      {
        [CSS_CLASSES.UNBOUNDED]: round,
        [CSS_CLASSES.HOVERED]: hovered,

        ['pressed']: actived,
      },
    );
  }, [hovered, actived]);

  function startPressAnimation() {
    setActived(true);
    // growAnimation?.cancel();
    const { rippleScale } = determineRippleSize();
    const option = {
      pseudoElement: PRESS_PSEUDO,
      duration: PRESS_GROW_MS,
      easing: EASING.STANDARD,
      fill: ANIMATION_FILL
    }
    const from ={
      scale: 1,
      ...option
    }
    const to ={
      scale: rippleScale,
      ...option
    }
    gasp.fromTo(".surface", from, to);
  }

  function endPressAnimation() {}

  // function getTranslationCoordinates(positionEvent?: Event, initialSize = 0) {
  //   const { height, width } = getDimensions();
  //   // end in the center
  //   const endPoint = {
  //     x: (width - initialSize) / 2,
  //     y: (height - initialSize) / 2,
  //   };

  //   let startPoint;
  //   if (positionEvent instanceof PointerEvent) {
  //     startPoint = getNormalizedPointerEventCoords(positionEvent);
  //   } else {
  //     startPoint = {
  //       x: width / 2,
  //       y: height / 2,
  //     };
  //   }

  //   // center around start point
  //   startPoint = {
  //     x: startPoint.x - initialSize / 2,
  //     y: startPoint.y - initialSize / 2,
  //   };

  //   return { startPoint, endPoint };
  // }

  // function getNormalizedPointerEventCoords(pointerEvent: any): {
  //   x: number;
  //   y: number;
  // } {
  //   const { scrollX, scrollY } = window;
  //   const { left, top } = getDimensions();
  //   const documentX = scrollX + left;
  //   const documentY = scrollY + top;
  //   const { pageX, pageY } = pointerEvent;
  //   return { x: pageX - documentX, y: pageY - documentY };
  // }

  function getDimensions() {
    return parent?.current.getBoundingClientRect();
  }

  function determineRippleSize() {
    const { height, width } = getDimensions();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE,
    );

    let maxRadius = maxDim;
    let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);

    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    maxRadius = hypotenuse + PADDING;

    if (round) {
      initialSize = initialSize - (initialSize % 2);
    }

    return {
      initialSize,
      rippleSize: `${(maxRadius + softEdgeSize) / initialSize}`,
      rippleScale: `${initialSize}px`,
    };
  }

  useEffect(() => {
    if (parent.current) {
      parent.current.onmouseenter = () => {
        setHovered(true);
      };
      parent.current.onmouseout = () => {
        setHovered(false);
        if (state !== State.INACTIVE) {
          endPressAnimation();
        }
      };
      parent.current.onmousedown = () => {
        setState(State.WAITING_FOR_CLICK);
        startPressAnimation();
      };
      parent.current.onmouseup = () => {
        if (state === State.HOLDING) {
          setState(State.WAITING_FOR_CLICK);
          return;
        }
        if (state === State.TOUCH_DELAY) {
          setState(State.WAITING_FOR_CLICK);
          startPressAnimation();
          return;
        }
      };
    }
  }, [parent.current]);

  return (
    <div className={root} ref={ref}>
      <div className={surface}></div>
    </div>
  );
};
