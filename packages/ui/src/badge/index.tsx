import {forwardRef} from 'react';
import classnames from 'classnames';
import {CSS_CLASSES} from './constants';
import {BadgeComponent, BadgeProps} from './interface';
import './index.scss';



export const Badge: BadgeComponent = forwardRef(({
  position = 'top-right',
  className,
  children
}: BadgeProps, ref: any) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.LARGE]: !!children,
    ['top-right']: position === 'top-right',
    ['top-left']: position === 'top-left',
    ['top-center']: position === 'top-center',
    ['bottom-right']: position === 'bottom-right',
    ['bottom-left']: position === 'bottom-left',
    ['bottom-center']: position === 'bottom-center',
    ['center']: position === 'center',
  });

  return (
    <div className={classNames} ref={ref}>
      <p className='value'>{children}</p>
    </div>
  )
})

Badge.displayName = 'Badge';
