import { useMemo, useRef } from 'react';
import classnames from 'classnames';
import type { BaseCompaonentProps } from '@/base/default.interface';
import { Ripple } from '@/ripple';
import { Focus } from '@/focus';
import { useSlot } from '@/slot';
import './index.scss';

export const Item = ({
  disabled,
  className,
  children,
  ...props
}: BaseCompaonentProps) => {
  const slots = useSlot(children);
  const li = useRef(null);
  const supportingTextClasses = classnames('supporting-text', {
    ['supporting-text--multi-line']: slots['multiLineSupportingText'],
  });
  const classNames = useMemo(() => {
    return classnames('mdc-list-item list-item', className, {
      ['with-one-line']: !slots['supportingText'],
      ['with-two-line']:
        slots['supportingText'] && !slots['multiLineSupportingText'],
      ['with-three-line']:
        slots['supportingText'] && slots['multiLineSupportingText'],
      ['disabled']: disabled,
    });
  }, [slots]);
  return (
    <li ref={li} className={classNames} {...props}>
      <div className="content-wrapper">
        <div className="start">{slots.start}</div>
        <div className="body">
          <span className="label-text">{children}</span>
          {slots['supportingText'] ? (
            <span className={supportingTextClasses}>
              {slots['supportingText']}
            </span>
          ) : null}
        </div>
        <div className="end">
          {slots['trailingSupportingText'] ? (
            <span className="trailing-supporting-text">
              {slots['trailingSupportingText']}
            </span>
          ) : (
            slots['end']
          )}
        </div>
        <Ripple parent={li}></Ripple>
        <Focus className="focus-ring" parent={li}></Focus>
      </div>
    </li>
  );
};
