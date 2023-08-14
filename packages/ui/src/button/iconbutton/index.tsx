import { forwardRef, useMemo, useRef, useState, isValidElement } from 'react';
import classnames from 'classnames';
import { Focus } from '@/focus';
import { Ripple } from '@/ripple';
import { useSlot } from '@/slot';
import { Icon } from '@/icon';
import type { ButtonProps } from '@/button/interface';
import { CSS_CLASSES } from './constants';
import './style/index.scss';

export const IconButton = forwardRef(
  (
    {
      variant,
      flipIcon,
      toggle,
      active,
      href,
      target,
      className,
      children,
      onClick,
    }: ButtonProps,
    ref: any,
  ) => {
    const [selected, setSelected] = useState(false);
    const slots = useSlot(children);
    const $el = ref || useRef(null);
    const classNames = useMemo(() => {
      return classnames(CSS_CLASSES.ROOT, className, {
        ['flip-icon']: flipIcon,
        ['selected']: active || (toggle && selected),
        ['toggle-filled']: variant === 'filled' && toggle,
        ['mdc-filled-icon-button filled']: variant === 'filled',
        ['mdc-tonal-icon-button filled-tonal']: variant === 'tonal',
        ['toggle-filled-tonal']: variant === 'tonal' && toggle,
        ['mdc-outlined-icon-button outlined']: variant === 'outlined',
        ['md-standard-icon-button standard']:
          variant !== 'filled' && variant !== 'outlined' && variant !== 'tonal',
      });
    }, [selected, active]);

    const isStringChildren = useMemo(() => !isValidElement(children), [children]);

    const props = {
      className: classNames,
      onClick: function (e: any) {
        setSelected(!selected);
        onClick?.(e);
      },
    };
    const content = (
      <>
        <Focus parent={$el}></Focus>
        <Ripple parent={$el}></Ripple>
        {isStringChildren ? (
          <Icon className="icon">{children}</Icon>
        ) : (
          <>
            {!selected ? (
              <span className="icon">{slots['leadingicon']}</span>
            ) : (
              <span className="icon icon--selected">
                {slots['selectedIcon'] ||slots['leadingicon'] }
              </span>
            )}
          </>
        )}
        <span className="touch"></span>
        {href ? <a className="link" href={href} target={target}></a> : null}
      </>
    );

    return (
      <>
        {href ? (
          <div {...props}>
            {isStringChildren ? content : slots.children + content}
          </div>
        ) : (
          <button {...props}>
            {isStringChildren ? content : slots.children + content}
          </button>
        )}
      </>
    );
  },
);
