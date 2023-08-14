import classnames from 'classnames';
import {useActive} from '@/hooks/useActive';
import { useSlot } from '@/slot';
import { TabsContext } from './provider';
import { Tab } from './tab';
import {TabsProps} from './interface';
import './style/tabs.scss';
import { useMemo } from 'react';

export function Tabs({ className, children, state, variant, value, onChange }: TabsProps) {
  const classNames = classnames('mdc-tabs', className, {
    ['bar']: variant === 'bar',
    ['indicator']: variant === 'indicator',
    ['primary']: state === 'primary',
    ['secondary']: state === 'secondary',
    ['vertical']: state === 'vertical',
  });
  const slots = useSlot(children);
  const activeState = useActive(children, value);
  const hasContent = useMemo(() => Object.keys(slots).length > 1, [slots])
  return (
    <TabsContext.Provider value={{...activeState, state, variant, onChange}}>
      <div className={classNames}>{slots.children}</div>
      {
        hasContent ? (
          <div className='mdc-tabs-content'>
        {slots[activeState.active]}
      </div>
        ) : null
      }

    </TabsContext.Provider>
  );
}

Tabs.Tab = Tab;
