import { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { Menu } from '@/menu';
import { Field } from '@/field';
import { Slot, useSlot } from '@/slot';
import { Icon } from '@/icon';
import { CSS_CLASSES } from './constants';
import { SelectProps } from './interface';
import './style/index.scss';

export const Select = ({
  value,
  variant,
  prefixText,
  defalutValue,
  required,
  label,
  type = 'select',
  error,
  errorText,
  disabled,
  className,
  children,
  onChange,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const slots = useSlot(children);
  const menu = useRef<any>(null);
  const [currentValue, setCurrentValue] = useState<any>(value || defalutValue);
  const [errorMessage, setErrorMessage] = useState(errorText);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    ['mdc-filled-select']: variant === 'filled',
    ['mdc-outlined-select']: variant === 'outlined',
  });

  const select = classnames('select', {
    ['disabled']: disabled,
    ['error']: error,
  });

  const doBlur = (e: any) => {
    if (!!required && !currentValue) {
      setErrorMessage('必填！');
    }
    const currentTarget = e.currentTarget;
    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement)) {
        setOpen(false);
        menu.current?.close();
      }
    });
  };

  const doFocus = () => {
    setOpen(true);
    menu.current?.open();
  };

  const doChange = (v: string) => {
    if(type === 'select') {
      setCurrentValue(v);
      onChange?.(v);
    }
  };

  const getLable = (v: string) => {
    if (!slots.children.length) {
      return label || v;
    }
    const res = slots.children.filter((child: any) => child.props.value === v);
    return res[0]?.props.children || v;
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className={classNames} tabIndex={1} onBlur={doBlur}>
      <div className={select}>
        <Field
          className="field"
          onFocus={doFocus}
          label={label}
          disabled={disabled}
          error={error}
          required={required}
          populated={!!currentValue}
          variant={variant}
        >
          <Slot name="start">
            <span className="icon leading">{slots['leadingicon']}</span>
          </Slot>
          <Slot name="end">
            <Icon className="icon trailing">
              {open ? 'arrow_drop_down' : 'arrow_right'}
            </Icon>
          </Slot>
          <div className="label">{getLable(currentValue)}</div>
          <Slot name="supporting-text">
            <span>{!!errorMessage ? errorMessage : prefixText}</span>
          </Slot>
        </Field>
        <Menu ref={menu} onChange={doChange} value={currentValue}>
          {slots.children}
        </Menu>
      </div>
    </div>
  );
};

Select.Option = Menu.Item;
