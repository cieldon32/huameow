import { useState, useRef, useMemo, forwardRef } from 'react';
import classnames from 'classnames';
import {Ripple} from '@/ripple';
import {Focus} from '@/focus';
import {CSS_CLASSES} from './constants';
import {RadioProps} from './interface';
import './index.scss';




export const Radio = forwardRef(({
  className,
  value,
  disabled,
  name,
}: RadioProps, ref: any) => {
  const [checked, setChecked] = useState(value || false);
  const $el = ref || useRef(null);
  const classNames = useMemo(() => {
    return classnames(CSS_CLASSES.ROOT, className, {
      [CSS_CLASSES.CHECKED]: checked
    })
  },[checked]);

  const doChange = (e: any) => {
    setChecked(e.target.checked);
  }

  return (
    <div
      className={classNames}
      ref={$el}
    >
      <Ripple round={true} parent={$el}></Ripple>
      <Focus parent={$el}></Focus>
      <svg className="icon" viewBox="0 0 20 20">
        <mask id="cutout">
          <rect width="100%" height="100%" fill="white" />
          <circle cx="10" cy="10" r="8" fill="black" />
        </mask>
        <circle className="outer circle" cx="10" cy="10" r="10" mask="url(#cutout)" />
        <circle className="inner circle" cx="10" cy="10" r="5" />
      </svg>
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={doChange}
      />
    </div>
  )
})
