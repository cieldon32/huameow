import { useState, useRef } from 'react';
import classnames from 'classnames';
import { Menu } from '@/menu';
import { Field } from '@/field';
import { Slot, useSlot } from '@/slot';
import { CSS_CLASSES } from './constants';
import {SelectProps} from './interface';
import './style/index.scss';

export const Select = ({
  variant,
  prefixText,
  defalutValue,
  required,
  label,
  error,
  errorText,
  disabled,
  className,
  children,
}: SelectProps) => {
  const slots = useSlot(children);
  const menu = useRef<any>(null);
  const [value, setValue] = useState(defalutValue);
  const [errorMessage, setErrorMessage] = useState(errorText);
  const classNames = classnames(CSS_CLASSES.ROOT, className);

  const select = classnames('select', className, {
    ['disabled']: disabled,
    ['error']: error,
    ['mdc-filled-select']: variant === 'filled',
    ['mdc-outlined-select']: variant === 'outlined',
  });

  const doBlur = (e: any) => {
    console.log('doBlur', e);
    // menu.current?.close();
    const v = e.target.value;
    if (required && !v) {
      setErrorMessage('必填！');
    }

  };

  const doFocus = () => {
    menu.current?.open();
  };

  const doChange = (v: string) => {
    console.log('doChange', v);
    setValue(v);
  };

  return (
    <div className={classNames} tabIndex={1} onBlur={doBlur}>
      <span className={select}>
        <Field
          className="field"
          onFocus={doFocus}
          label={label}
          disabled={disabled}
          error={error}
          required={required}
          populated={!!value}
        >
          <Slot name="start">
            <span className="icon leading">{slots['leadingicon']}</span>
          </Slot>
          <Slot name="end">
            <span className="icon trailing">{slots['trailingicon']}</span>
          </Slot>
          <div className="label">{value}</div>
          <Slot name="supporting-text">
            <span>{!!errorMessage ? errorMessage : prefixText}</span>
          </Slot>
        </Field>
        <Menu ref={menu} onChange={doChange}>
          {slots.children}
        </Menu>
      </span>
    </div>
  );
};

Select.Option = Menu.Item;
