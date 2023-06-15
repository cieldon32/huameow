import classnames from 'classnames';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {Tab} from './tab';
import {CSS_CLASSES} from './constants';
import './style/index.scss';

export const Nav = ({
  className,
  children,
  ...props
}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {

  });
  return (
    <div className={classNames} {...props}>
      <div className={CSS_CLASSES.TABS}>
        {children}
      </div>
    </div>
  )
}

Nav.Tab = Tab;
