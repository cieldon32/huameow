import { useRef, useContext, useEffect, useState, useMemo } from 'react';
import classnames from 'classnames';
import { Focus } from '@/focus';
import { Ripple } from '@/ripple';
import { SegmentContext } from '../segmentedButtonSet/provider';
import { CSS_CLASSES } from './constants';
import './index.scss';

export const SegmentedButton = ({
  noCheckmark,
  hasIcon,
  value,
  disabled,
  className,
  label,
  children,
  ...props
}: any) => {
  const [animState, setAnimState] = useState('');
  const ref = useRef(null);
  const { selected, doSelect, updateSelect } = useContext<any>(SegmentContext);
  const isSelected = useMemo(() => {
    return selected.includes(value) || props.selected;
  }, [selected, props.selected]);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    ['md3-segmented-button--selected']: isSelected,
    ['md3-segmented-button--unselected']: !isSelected,
    ['md3-segmented-button--with-label']: children !== '' || label !== '',
    ['md3-segmented-button--without-label']: children === '' || label === '',
    ['md3-segmented-button--with-icon']: hasIcon,
    ['md3-segmented-button--with-checkmark']: !noCheckmark,
    ['md3-segmented-button--without-checkmark']: noCheckmark,
    ['md3-segmented-button--selecting']: animState === 'selecting',
    ['md3-segmented-button--deselecting']: animState === 'deselecting',
  });

  function doClick() {
    setAnimState('selecting')
    doSelect(value);
  }

  function renderLeadingWithLabel() {
    return (
      <span className="md3-segmented-button__leading" aria-hidden="true">
        <span className="md3-segmented-button__graphic">
          <svg className="md3-segmented-button__checkmark" viewBox="0 0 24 24">
            <path
              className="md3-segmented-button__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            ></path>
          </svg>
          <span className="md3-segmented-button__icon" aria-hidden="true">
            <slot name="icon"></slot>
          </span>
        </span>
      </span>
    );
  }

  function renderLeadingWithoutLabel() {
    return (
      <span className="md3-segmented-button__leading" aria-hidden="true">
        <span className="md3-segmented-button__graphic">
          <svg className="md3-segmented-button__checkmark" viewBox="0 0 24 24">
            <path
              className="md3-segmented-button__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"
            ></path>
          </svg>
        </span>
        <span className="md3-segmented-button__icon" aria-hidden="true">
          <slot name="icon"></slot>
        </span>
      </span>
    );
  }

  useEffect(() => {
    if(props.selected){
      updateSelect(value);
    }

  }, [props.selected]);

  useEffect(() => {
    if(!isSelected){
      setAnimState('deselecting')
    }
  }, [isSelected])

  return (
    <button
      ref={ref}
      disabled={disabled}
      onClick={doClick}
      className={classNames}
    >
      <Focus parent={ref} className="md3-segmented-button__focus-ring"></Focus>
      <Ripple parent={ref} className="md3-segmented-button__ripple"></Ripple>
      <span className="md3-segmented-button__outline"></span>
      {children || label
        ? renderLeadingWithLabel()
        : renderLeadingWithoutLabel()}
      <span className="md3-segmented-button__label-text">
        {label || children}
      </span>
      <span className="md3-segmented-button__touch"></span>
    </button>
  );
};
