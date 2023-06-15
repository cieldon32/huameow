import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import { useSlot } from '@/slot';
import { useFocus } from '@/hooks/useFocus';
import { CSS_CLASSES } from './constants';
import { ReactElement, useState } from 'react';
import './style/index.scss';

export const Field = ({
  variant = 'filled',
  className,
  label,
  disabled,
  error,
  populated,
  required,
  children,
  ...props
}: any) => {
  const floatingLabelEl = useRef(null);
  const restingLabelEl = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { focused, doBlur, doFocus } = useFocus();
  const slots = useSlot(children);
  const isFilled = variant === 'filled';
  const isOutlined = variant === 'outlined';
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.FILLED]: isFilled,
    [CSS_CLASSES.OUTLINED]: isOutlined,
  });

  const field = classnames('field', {
    [CSS_CLASSES.DISABLED]: disabled,
    [CSS_CLASSES.ERROR]: error,
    [CSS_CLASSES.START]: slots.start,
    [CSS_CLASSES.END]: slots.end,
    [CSS_CLASSES.POPULATED]: populated,
    [CSS_CLASSES.NO_LABEL]: !label,
    ['focused']: focused,
    ['required']: required,
  });
  function renderFilled() {
    return (
      <>
        <div className="background"></div>
        <div className="state-layer"></div>
        <div className="active-indicator"></div>
      </>
    );
  }

  function renderOutlined(floatingLabel: ReactElement) {
    return (
      <div className="outline">
        <div className="outline-start"></div>
        <div className="outline-notch">
          <div className="outline-panel-inactive"></div>
          <div className="outline-panel-active"></div>
          <div className="outline-label">${floatingLabel}</div>
        </div>
        <div className="outline-end"></div>
      </div>
    );
  }
  const floatingLabel = renderLabel(true, floatingLabelEl);

  function renderLabel(isFloating: boolean, ref?: any) {
    let visible: boolean;
    if (isFloating) {
      visible = focused || populated || isAnimating;
    } else {
      visible = !focused && !populated && !isAnimating;
    }
    const labelClassnames = classnames('label', {
      hidden: !visible,
      floating: isFloating,
      resting: !isFloating,
    });
    const requiredTect = required ? '*' : '';
    const animateStyle = getAnimateStyle();
    return (
      <span
        style={isAnimating ? animateStyle : {}}
        ref={ref}
        className={labelClassnames}
        aria-hidden={!visible}
      >
        {requiredTect}{label}
      </span>
    );
  }

  function getAnimateStyle() {
    if (!floatingLabelEl.current || !restingLabelEl.current) {
      return {};
    }
    const {x: floatingX, y: floatingY, height: floatingHeight} = (floatingLabelEl.current as any).getBoundingClientRect();
    const {x: restingX, y: restingY, height: restingHeight} = (restingLabelEl.current as any).getBoundingClientRect();
    const floatingScrollWidth = (floatingLabelEl.current as any).scrollWidth;
    const restingScrollWidth = (restingLabelEl.current as any).scrollWidth;
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;
    const yDelta = restingY - floatingY +
        Math.round((restingHeight - floatingHeight * scale) / 2);
    const restTransform =
        `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;
    // const restingClientWidth = (restingLabelEl.current as any).clientWidth;
    // const isRestingClipped = restingScrollWidth > restingClientWidth;
    // const width = isRestingClipped ? `${restingClientWidth / scale}px` : '';
    if (focused || populated) {
      return {transform: restTransform};
    }

    return {transform: floatTransform}
  }

  function animateLabelIfNeeded({ wasFocused, wasPopulated }: any) {
    if (!label) {
      return;
    }
    wasFocused ??= focused;
    wasPopulated ??= populated;
    const wasFloating = wasFocused || wasPopulated;
    const shouldBeFloating = focused || populated;
    if (wasFloating === shouldBeFloating) {
      return;
    }
    setIsAnimating(true);
  }

  useEffect(() => {
    animateLabelIfNeeded({
      wasFocused: focused,
      wasPopulated: populated,
    });
  }, [focused, populated]);

  return (
    <div
      className={classNames}
      {...props}
      tabIndex={0}
      onBlur={doBlur}
      onFocus={doFocus}
    >
      <div className={field}>
        <div className="container-overflow">
          {isOutlined ? renderOutlined(floatingLabel) : null}
          {isFilled ? renderFilled() : null}
          <div className="container">
            <div className="start">{slots.start}</div>
            <div className="middle">
              {renderLabel(false, restingLabelEl)}
              {isOutlined ? null : floatingLabel}
              <div className="content">{slots.children}</div>
            </div>
            <div className="end">{slots.end}</div>
          </div>
        </div>
        <div className="supporting-text">
          <div className="supporting-text-start">
            {slots['supporting-text']}
          </div>
          <div className="supporting-text-end">
            {slots['supporting-text-end']}
          </div>
        </div>
      </div>
    </div>
  );
};
