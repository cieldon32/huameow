import classnames from 'classnames';
import {Icon} from '@/icon';
import {CSS_CLASSES} from './constants';
import {TabProps} from './interface';
import './style/index.scss';

export const Tab = ({children, className, icon, active}: TabProps) => {
  const classNames = classnames(CSS_CLASSES.TAB, className, {
    [CSS_CLASSES.TAB_ACTIVE]: active
  });
  const iconClassNames = classnames(CSS_CLASSES.ICON, className, {
    [CSS_CLASSES.ICONACTIVE]: active
  });
  return (
    <button className={classNames}>
      <span className={CSS_CLASSES.ICONCONTENT}>
        <span className={CSS_CLASSES.TAB_ACTIVE_INDICATOR}></span>
        <Icon className={iconClassNames}>{icon}</Icon>
      </span>
      <span className={CSS_CLASSES.LABEL}>{children}</span>
    </button>
  )
};
