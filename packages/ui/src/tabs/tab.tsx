import { forwardRef, useRef, useContext } from 'react';
import classnames from 'classnames';
import { Ripple } from '@/ripple';
import { Focus } from '@/focus';
import { Elevation } from '@/elevation';
import { useSlot } from '@/slot';
import { TabsContext } from './provider';
import './style/tab.scss';

export const Tab = forwardRef(({ className, children, name }: any, ref: any) => {
  const {toggleActive, active, state, variant, onChange} = useContext<any>(TabsContext);
  const slots = useSlot(children);
  const $el = ref || useRef(null);
  const classNames = classnames('mdc-tab', className, {
    ['bar']: variant === 'bar',
    ['indicator']: variant === 'indicator',
    ['selected']: active === name,
    ['primary']: state === 'primary',
    ['secondary']: state === 'secondary',
    ['vertical']: state === 'vertical',
  });
  function onActive() {
    toggleActive(name);
    onChange?.(name)
  }

  return (
    <div className={classNames}>
      <button onClick={onActive}>
        <Focus parent={$el}></Focus>
        <Elevation></Elevation>
        <Ripple parent={$el}></Ripple>
        <span className="touch"></span>
        <div className="content">
          {slots.icon}
          <span className="label">{children}</span>
          <div className="line"></div>
        </div>
      </button>
    </div>
  );
});
