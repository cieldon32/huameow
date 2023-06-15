import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { defaultTo } from 'ramda';
import { CSS_CLASSES } from './constants';
import {ProgressProps} from './interface';
import './style/index.scss';

export const Progress = ({
  buffer = 1,
  fourColors = false,
  text,
  type = 'linear',
  className,
  ...props
}: ProgressProps) => {
  const value = defaultTo(0)(props.value);
  const indeterminate = defaultTo(false)(props.indeterminate);
  const [animationReady, setanimationReady] = useState(true);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.TYPE_LINEAR]: type === 'linear',
    [CSS_CLASSES.TYPE_CIRCULAR]: type === 'circular',
  });

  const progressStyles = {
    transform: `scaleX(${(indeterminate ? 1 : value) * 100}%)`,
  };
  const bufferStyles = {
    transform: `scaleX(${(indeterminate ? 1 : buffer) * 100}%)`,
  };

  const linear = classnames(
    CSS_CLASSES.LINEAR,
    {},
    {
      [CSS_CLASSES.INDETERMINATE]: indeterminate,
      [CSS_CLASSES.ANIMATION_READY]: animationReady,
      [CSS_CLASSES.FOUR_COLORS]: fourColors,
    },
  );

  const renderIndeterminateContainer = () => (
    <div className="spinner">
      <div className="left">
        <div className="circle"></div>
      </div>
      <div className="right">
        <div className="circle"></div>
      </div>
    </div>
  );

  const renderDeterminateContainer = () => {
    const dashOffset = (1 - value) * 100;
    const pathLength = 100;
    return (
      <svg viewBox="0 0 4800 4800">
        <circle className="track" pathLength={pathLength}></circle>
        <circle
          className="progress"
          pathLength={pathLength}
          strokeDashoffset={dashOffset}
        ></circle>
      </svg>
    );
  };

  useEffect(() => {
    setanimationReady(true);
  }, []);

  return (
    <div className={classNames}>
      {type === 'linear' ? (
        <div className="mdc-line-progress">
          <div className={linear}>
            <div className="track"></div>
            <div className="buffer-bar" style={bufferStyles}></div>
            <div className="bar primary-bar" style={progressStyles}>
              <div className="bar-inner"></div>
            </div>
            <div className="bar secondary-bar">
              <div className="bar-inner"></div>
            </div>
          </div>
        </div>
      ) : null}
      {type === 'circular' ? (
        <div className="mdc-circular-progress">
          {indeterminate
            ? renderIndeterminateContainer()
            : renderDeterminateContainer()}
        </div>
      ) : null}
      {text ? <div className='text'><label>{text}</label></div> : null}
    </div>
  );
};
