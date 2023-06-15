import { useState, useRef, useMemo, forwardRef } from 'react';
import classnames from 'classnames';
import { Elevation } from '@/elevation';
import { Ripple } from '@/ripple';
import { Focus } from '@/focus';
import {Icon} from '@/icon';
import { useSlot } from '@/slot';
import { CSS_CLASSES } from './constants';
import {ChipProps} from './interface';
import './style/index.scss';

export const Chip = forwardRef(({
  disabled,
  className,
  href,
  target,
  type = 'assist',
  children,
}: ChipProps, ref: any) => {
  const slots = useSlot(children);
  const $el = ref || useRef(null);
  const [selected, setSelected] = useState(false);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    ['mdc-filter-chip']: type === 'filter',
    ['mdc-assist-chip']: type === 'assist',
    ['mdc-input-chip']: type === 'input',
    ['mdc-suggestion-chip']: type === 'suggestion',
  });
  const elevated = true;
  const container = useMemo(() => {
    return classnames(CSS_CLASSES.CONTAINER, {
      [CSS_CLASSES.DISABLED]: disabled,
      [CSS_CLASSES.ELEVATED]: elevated,
      [CSS_CLASSES.SELECTED]: selected
    })
  }, [selected]);

  const events = type === 'filter' ? {
    onClick: () => {
      setSelected((v) => !v);
    }
  } : {}

  const content = (
    <>
      {elevated ? <Elevation></Elevation> : <span className="outline"></span>}
      <Ripple parent={$el}></Ripple>
      <Focus parent={$el}></Focus>
      <span className="icon leading">
        {type === 'filter' && selected ? (<Icon className="checkmark">done</Icon>) : slots['leadingicon']}
      </span>
      <span className="label">{slots['children']}</span>
      <span className="icon trailing">
        {type === 'input' ? (<Icon className="closemark">close</Icon>) : slots['trailingicon']}
      </span>
    </>
  );

  return (
    <div className={classNames} ref={$el} {...events}>
      {href ? (
        <a className={container} href={href} target={target}>
          {content}
        </a>
      ) : (
        <button className={container}>{content}</button>
      )}
    </div>
  );
});
