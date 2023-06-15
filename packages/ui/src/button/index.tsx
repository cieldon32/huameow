import { forwardRef, useRef } from 'react';
import classnames from 'classnames';
import { Ripple } from '@/ripple';
import { Focus } from '@/focus';
import { Elevation } from '@/elevation';
import { useSlot } from '@/slot';
import {SegmentedButtonSet} from './segmentedButtonSet';
import {SegmentedButton} from './segmentedButton';
import {IconButton} from './iconbutton';
import { CSS_CLASSES } from './constants';
import { ButtonProps, ButtonComponent } from './interface';
import './style/index.scss';

export const Button: ButtonComponent = forwardRef(({
  multiple,
  type,
  variant,
  className,
  disabled,
  href,
  target,
  children,
  onClick,
}: ButtonProps, ref: any) => {
  const $el = ref || useRef(null);
  const slots = useSlot(children);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.FILLED]: variant === 'filled',
    [CSS_CLASSES.OUTLINED]: variant === 'outlined',
    [CSS_CLASSES.ELEVATED]: variant === 'elevated',
    [CSS_CLASSES.TONAL]: variant === 'tonal',
    [CSS_CLASSES.TEXT]: type === 'link',
    [CSS_CLASSES.ELEVATION]:
      variant === 'filled' || variant === 'elevated' || variant === 'tonal',
    ['md3-button--icon-leading']: slots['leadingicon'],
    ['md3-button--icon-trailing']: slots['trailingicon'],
  });
  const isDisabled = disabled && !href;

  const props = {
    className: classNames,
    disabled: isDisabled,
    ref,
    onClick
  };

  const content = (
    <>
      <Focus parent={$el}></Focus>
      <Elevation></Elevation>
      {
        type || variant ? (<Ripple parent={$el} className="md3-button__ripple"></Ripple>) : null
      }
      {
        variant === 'outlined' ? (<span className="md3-button__outline"></span>) : null
      }
      <span className="md3-button__touch"></span>
      {slots['leadingicon']}
      {slots['children'].length ? (
        <span className="md3-button__label">{slots['children']}</span>
      ) : null}
      {slots['trailingicon']}
    </>
  );

  function renderBaseBtn() {
    return (
      <>
      {href ? (
        <a {...props} href={href} target={target} ref={$el}>
          {content}
        </a>
      ) : (
        <button {...props} ref={$el}>{content}</button>
      )}
    </>
    )
  }

  return (
    <>
      {
        type === 'segment' ? (
          <SegmentedButtonSet multiple={multiple}>{children}</SegmentedButtonSet>
        ) : null
      }
      {
        type === 'icon' ? (<IconButton variant={variant}>{children}</IconButton>) : null
      }
      {
        type !== 'segment' && type !== 'icon' ? renderBaseBtn() : null
      }
    </>
  );
});

Button.Item = SegmentedButton;
