import { useContext } from 'react';
import classnames from 'classnames';
import {Icon} from '@/icon';
import {NavContext} from './provider';
import {CSS_CLASSES} from './constants';
import {TabProps} from './interface';
import './style/index.scss';

export const Tab = ({children, className, icon, name}: TabProps) => {
  const {toggleActive, active} = useContext<any>(NavContext);
  const classNames = classnames(CSS_CLASSES.TAB, className, {
    [CSS_CLASSES.TAB_ACTIVE]: active
  });
  const iconClassNames = classnames(CSS_CLASSES.ICON, className, {
    [CSS_CLASSES.ICONACTIVE]: active
  });

  function onActive() {
    name && toggleActive(name);
  }
  return (
    <button className={classNames} onClick={onActive}>
      <span className={CSS_CLASSES.ICONCONTENT}>
        <span className={CSS_CLASSES.TAB_ACTIVE_INDICATOR}></span>
        <Icon className={iconClassNames}>{icon}</Icon>
      </span>
      <span className={CSS_CLASSES.LABEL}>{children}</span>
    </button>
  )
};
