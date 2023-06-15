import { useState, useMemo, forwardRef, useRef } from 'react';
import classnames from 'classnames';
import {Ripple} from '@/ripple';
import {Focus} from '@/focus';
import {CSS_CLASSES} from './constants';
import {CheckboxProps} from './interface';
import './index.scss';



export const Checkbox = forwardRef(({
  value,
  disabled,
  indeterminate,
  name,
  className,
}: CheckboxProps, ref: any) => {
  const $el = ref || useRef(null);
  const [checked, setChecked] = useState(value || false);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.DISABLED]: disabled,
  });

  const container = useMemo(() => {
    return classnames(CSS_CLASSES.CONTAINER, {}, {
      [CSS_CLASSES.CHECKED]: checked,
      [CSS_CLASSES.SELECTED]: checked,
      [CSS_CLASSES.UNSELECTED]: !checked,
      [CSS_CLASSES.PREV_CHECKED]: !checked,
      [CSS_CLASSES.PREV_UNSELECTED]: checked,
      [CSS_CLASSES.INDETERMINATE]: indeterminate,
    });
  }, [checked]);


  const doChange = (e: any) => {
    setChecked(e.target.checked);
  }

  return (
    <div
      className={classNames}
      ref={$el}
    >
      <div className={container}>
        <div className="outline"></div>
        <div className="background"></div>
        <Ripple parent={$el}></Ripple>
        <Focus parent={$el}></Focus>
        <svg className="icon" viewBox="0 0 18 18">
          <rect className="mark short" />
          <rect className="mark long" />
        </svg>
      </div>
      <input
        type="checkbox"
        disabled={disabled}
        name={name}
        checked={checked}
        onChange={doChange}
      />
    </div>
  )
})
