import { forwardRef } from 'react';
import classnames from 'classnames';
import {LayoutProps} from './interface';
import './style/sider.scss';


export const Sider = forwardRef(({

  className,
  children
}: LayoutProps, ref: any) => {
  const classNames = classnames('md-slider', className, {
  });
  return (
    <div className={classNames} ref={ref}>
{children}
    </div>
  )
})
