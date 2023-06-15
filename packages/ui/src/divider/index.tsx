import { forwardRef } from 'react';
import classnames from 'classnames';
import {CSS_CLASSES} from './constants';
import {DividerProps} from './interface';
import './index.scss';




export const Divider = forwardRef(({
  inset,
  insetStart,
  insetEnd,
  className,
}: DividerProps, ref: any) => {
  const classNames = classnames('mdc-divider', className, {
    [CSS_CLASSES.INSET]: inset,
    [CSS_CLASSES.INSETEND]: insetEnd,
    [CSS_CLASSES.INSETSTART]: insetStart
  });

  return (
    <hr className={classNames} ref={ref} />
  )
})
