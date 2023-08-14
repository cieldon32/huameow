import classnames from 'classnames';
import {Icon} from '@/icon';
import { useSlot } from '@/slot';
import { CSS_CLASSES } from './constants';
import './style/index.scss';

export const AppBar = ({
  className,
  fixed,
  collapsed,
  short,
  prominent,
  dense,
  title,
  children
}: any) => {
  const slots = useSlot(children);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.FIXED]: fixed,
    [CSS_CLASSES.SHORT]: collapsed || short,
    [CSS_CLASSES.SHORT_COLLAPSED]: collapsed,
    [CSS_CLASSES.PROMINENT]: prominent,
    [CSS_CLASSES.DENSE]: dense,
  });
  return (
    <header className={classNames}>
      <div className={CSS_CLASSES.ROW}>
        <div className={CSS_CLASSES.SECTION_START}>
          <Icon className='menu'>menu</Icon>
          <span className={CSS_CLASSES.TITLE}>{title}</span>
        </div>
        <div className={CSS_CLASSES.SECTION_MIDDLE}>{slots['children']}</div>
        <div className={CSS_CLASSES.SECTION_END}>
          {slots['tools']}
          <Icon className='more'>more_horiz</Icon>
        </div>
      </div>
    </header>
  )
}
