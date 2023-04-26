import classnames from 'classnames';
import Icon from '@/icon';
import {CSS_CLASSES} from './constants';
import './style/index.scss';

export const Tab = ({children, className, icon, active}: any) => {
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
        <Icon path={icon} className={iconClassNames} />
      </span>
      <span className={CSS_CLASSES.LABEL}>{children}</span>
    </button>
  )
};


{/* <button class="md3-navigation-tab">
  <md-focus-ring></md-focus-ring>
  <md-ripple class="md3-navigation-tab__ripple"></md-ripple>
  <span aria-hidden="true" class="md3-navigation-tab__icon-content">
    <span class="md3-navigation-tab__active-indicator"></span>
    <span class="md3-navigation-tab__icon">
      <slot name="inactiveIcon"></slot>
    </span>
    <span class="md3-navigation-tab__icon md3-navigation-tab__icon--active">
      <slot name="activeIcon"></slot>
    </span>
    ${this.renderBadge()}
  </span>
  <span aria-hidden="" class="md3-navigation-tab__label-text">label</span>
</button>


<div class="md3-navigation-bar">
  <md-elevation></md-elevation>
  <div class="md3-navigation-bar__tabs-slot-container">
    <slot></slot>
  </div>
</div> */}
