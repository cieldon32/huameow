import { useCallback, useMemo, useState, useRef } from 'react';
import classnames from 'classnames';
import { Elevation } from '@/elevation';
import { Ripple } from '@/ripple';
import { Focus } from '@/focus';
import { CSS_CLASSES } from './constants';
import {SliderProps} from './interface';
import './index.scss';

export const Slider = ({
  disabled,
  range = false,
  hasTickMarks = false,
  step = 1,
  min = 0,
  max = 100,
  // value = 50,
  valueStart = 25,
  valueEnd = 75,
  valueLabel,
  valueStartLabel,
  valueEndLabel,
  className,
  children,
}: SliderProps) => {
  const ref = useRef(null);
  const inputA = useRef(null);
  const inputB = useRef(null);
  const rippleA = useRef(null);
  const rippleB = useRef(null);
  const handlesOverlapping = false;
  // const [handlesOverlapping, setHandlesOverlapping] = useState(false);
  // const [onTopId, setOnTopId] = useState('b');
  const onTopId = 'b';
  const [rippleAShowing, setRippleAShowing] = useState(false);
  const [rippleBShowing, setRippleBShowing] = useState(false);
  const handleAHover = false;
  const handleBHover = false;
  // const [handleAHover, setHandleAHover] = useState(false);
  // const [handleBHover, setHandleBHover] = useState(false);
  const valueA = 0;
  const valueB = 0;
  // const [valueA, setValueA] = useState(0);
  // const [valueB, setValueB] = useState(0);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.LARGE]: !!children,
  });
  const track = classnames({
    ['tickMarks']: hasTickMarks,
  });
  const handleContainer = useMemo(() => {
    return classnames({
      ['hover']: handleAHover || handleBHover,
    });
  }, [handleAHover, handleBHover]);

  function getMetrics() {
    const s = Math.max(step, 1);
    const range = Math.max(max - min, s);
    const lower = Math.min(valueA, valueB);
    const upper = Math.max(valueA, valueB);
    const lowerFraction = (lower - min) / range;
    const upperFraction = (upper - min) / range;
    return {
      step: s,
      range,
      lower,
      upper,
      lowerFraction,
      upperFraction,
    };
  }

  const containerStyles: any = useMemo(() => {
    const { lowerFraction, upperFraction, step, range } = getMetrics();
    return {
      '--slider-lower-fraction': String(lowerFraction),
    '--slider-upper-fraction': String(upperFraction),
    '--slider-tick-count': String(range / step)
    }
  }, []);

  function renderLabel(value: string) {
    return (
      <div className="label">
        <span className="labelContent">{value}</span>
      </div>
    );
  }

  function renderInput({ id, lesser, value }: any) {
    // const ariaLabelDescriptor = range
    //   ? ` - ${lesser ? `start` : `end`} handle`
    //   : '';
    // const input = classnames({
    //   lesser,
    //   [id]: true,
    // });

    function doChange(e: any) {
      console.log('doChange', e, value, valueStart, valueEnd);
      // if (inputA) {
      //   valueA = inputA.valueAsNumber ?? 0;
      // }
      // valueB = this.inputB!.valueAsNumber;
      // this.updateOnTop(e);
      // // update value only on interaction
      // const lower = Math.min(this.valueA, this.valueB);
      // const upper = Math.max(this.valueA, this.valueB);
      // if (this.range) {
      //   this.valueStart = lower;
      //   this.valueEnd = upper;
      // } else {
      //   this.value = this.valueB;
      // }
    }

    return (
      <input
        type="range"
        ref={id === 'a' ? inputA : inputB}
        disabled={disabled}
        min={String(min)}
        max={String(max)}
        step={String(step)}
        value={String(value)}
        tabIndex={lesser ? 1 : 0}
        onChange={doChange}
      />
    );
  }

  function renderHandle({ id, lesser, showRipple, hover, label }: any) {
    const onTop = !disabled && id === onTopId;
    const isOverlapping = !disabled && handlesOverlapping;
    const handle = classnames('handle', {
      [id]: true,
      lesser,
      hover,
      onTop,
      isOverlapping,
    });
    return (
      <div className={handle}>
        <div className="handleNub">
          <Elevation></Elevation>
        </div>
        {label ? renderLabel(label) : null}
        {showRipple ? (
          <Ripple
            parent={ref}
            className={id}
            ref={id === 'a' ? rippleA : rippleB}
          ></Ripple>
        ) : null}
        <Focus parent={ref}></Focus>
      </div>
    );
  }



  const {labelA, labelB} = useMemo(() => {
    let labelA = String(valueA);
    let labelB = String(valueB);
    if (range) {
      const a = isFlipped ? valueEndLabel : valueStartLabel;
      const b = isFlipped ? valueStartLabel : valueEndLabel;
      labelA = a ?? labelA;
      labelB = b ?? labelB;
    } else {
      labelB = valueLabel ?? labelB;
    }
    return {
      labelA,
      labelB
    }
  }, [valueA, valueB])

  const isFlipped = valueA > valueB;
  const getRippleA = useCallback(() => {
    // bind to this
    if (!handleAHover) {
      return null;
    }
    setRippleAShowing(true);
    return rippleA;
  }, []);
  const getRippleB = useCallback(() => {
    // bind to this
    if (!handleBHover) {
      return null;
    }
    setRippleBShowing(true);
    return rippleB;
  }, []);

  const inputAProps = {
    id: 'a',
    lesser: !isFlipped,
    value: valueA,
    label: labelA,
    getRipple: getRippleA,
  };

  const inputBProps = {
    id: 'b',
    lesser: isFlipped,
    value: valueB,
    label: labelB,
    getRipple: getRippleB,
  };

  const handleAProps = {
    id: 'a',
    lesser: !isFlipped,
    showRipple: rippleAShowing,
    hover: handleAHover,
    label: labelA,
  };

  const handleBProps = {
    id: 'b',
    lesser: isFlipped,
    showRipple: rippleBShowing,
    hover: handleBHover,
    label: labelB,
  };

  console.log('containerStyles', containerStyles)

  return (
    <div className={classNames} style={containerStyles}>
      {range ? renderInput(inputAProps) : null}
      {renderInput(inputBProps)}
      <div className={track}></div>
      <div className="handleContainerPadded">
        <div className="handleContainerBlock">
          <div className={handleContainer}>
            {range ? renderHandle(handleAProps) : null}
            {renderHandle(handleBProps)}
          </div>
        </div>
      </div>
    </div>
  );
};
