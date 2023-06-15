import { forwardRef, useMemo, useRef, useState } from 'react';
import classnames from 'classnames';
import { Focus } from '@/focus';
import { Ripple } from '@/ripple';
import { CSS_CLASSES } from './constants';
import { SwitchProps } from './interface';
import './index.scss';

export const Switch = forwardRef(
  ({ disabled, hasIcon, className }: SwitchProps, ref: any) => {
    const $el = ref || useRef(null);
    const [selected, setSelected] = useState(false);
    const classNames = useMemo(() => {
      return classnames(CSS_CLASSES.ROOT, className, {
        ['switch--selected']: selected,
        ['switch--unselected']: !selected,
      });
    }, [selected]);
    const handle = useMemo(() => {
      return classnames('handle', {
        'with-icon': hasIcon && selected,
      });
    }, [selected]);

    const shouldShowIcons = hasIcon;

    const OnIcon = (
      <svg className="icon icon--on" viewBox="0 0 24 24">
        <path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z" />
      </svg>
    );

    const OffIcon = (
      <svg className="icon icon--off" viewBox="0 0 24 24">
        <path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z" />
      </svg>
    );

    function doClick() {
      if (disabled) {
        return false;
      }
      setSelected(!selected);
    }

    return (
      <button
        type="button"
        className={classNames}
        role="switch"
        onClick={doClick}
      >
        <Focus parent={$el}></Focus>
        <span className="track">
          <span className="handle-container">
            <Ripple parent={$el}></Ripple>
            <span className={handle}>
              $
              {shouldShowIcons ? (
                <div className="icons">
                  {OnIcon}
                  {!hasIcon ? OffIcon : null}
                </div>
              ) : null}
            </span>
            <span className="touch"></span>
          </span>
        </span>
      </button>
    );
  },
);
