import classnames from 'classnames';
import { useSlot } from '@/slot';
import {useActive} from '@/hooks/useActive';
import {NavContext} from './provider';
import {Tab} from './tab';
import {CSS_CLASSES} from './constants';
import {NavProps} from './interface';
import './style/index.scss';

export const Nav = ({
  className,
  children,
  ...props
}: NavProps) => {
  const activeState = useActive(children);
  const slots = useSlot(children);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {

  });
  return (
    <NavContext.Provider value={activeState}>
    <div className={classNames} {...props}>
      <div className={CSS_CLASSES.TABS}>
        {slots.children}
      </div>
      {slots.content}
    </div>
    </NavContext.Provider>

  )
}

Nav.Tab = Tab;
