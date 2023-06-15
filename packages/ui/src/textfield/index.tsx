import { useState } from 'react';
import classnames from 'classnames';
import { Field } from '@/field';
import {Slot, useSlot} from '@/slot';
import { CSS_CLASSES } from './constants';
import {TextFieldProps} from './interface';
import './style/index.scss';

export const TextField = ({
  variant = 'filled',
  value: defalutValue,
  type,
  className,
  label,
  disabled,
  error,
  errorText,
  prefixText,
  suffixText,
  required,
  placeholder,
  max,
  maxlength,
  min,
  minlength,
  pattern,
  step,
  rulers,
  children,
  ...props
}: TextFieldProps<string>) => {
  const slots = useSlot(children);
  const isFilled = variant === 'filled';
  const isOutlined = variant === 'outlined';
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.FILLED]: isFilled,
    [CSS_CLASSES.OUTLINED]: isOutlined,
    [CSS_CLASSES.DISABLED]: disabled,
    [CSS_CLASSES.ERROR]: error,
  });
  const [value, setValue] = useState(defalutValue);
  const [errorMessage, setErrorMessage] = useState(errorText);

  const doChange = (e: any) => {
    const v = e.target.value;
    setValue(v);
  };

  const doBlur = (e: any) => {
    const v = e.target.value;
    if (required && !rulers && !v) {
      setErrorMessage('必填！');
    } else if (
      required &&
      !rulers &&
      pattern &&
      !new RegExp(pattern).test(String(v))
    ) {
      setErrorMessage('输入格式不正确～');
    } else if (rulers?.length) {
      for (let i = 0; i < rulers.length; i++) {
        const rule = rulers[i];
        if (
          (rule.required && !v) ||
          (rule.pattern && !new RegExp(rule.pattern).test(String(v)))
        ) {
          setErrorMessage(rule.message);
          break;
        } else if (rule.validator) {
          const res = rule.validator?.(v);
          if (res) {
            setErrorMessage(res);
          } else {
            setErrorMessage('');
          }
        }
      }
    }
  };

  return (
    <div className={classNames} {...props}>
      <div className="text-field">
        <Field
          label={label}
          disabled={disabled}
          error={!!errorMessage}
          required={required}
          populated={!!value}
          onBlur={doBlur}
        >
          <Slot name="start">
            <span className="icon leading">{slots['leadingicon']}</span>
          </Slot>
          <Slot name="end">
            <span className="icon trailing">{slots['trailingicon']}</span>
          </Slot>
          <Slot name="supporting-text">
            <span>{!!errorMessage ? errorMessage : prefixText}</span>
          </Slot>
          <Slot name="supporting-text-end">
            {maxlength ? (
              <span>
                {value?.length}/{maxlength}
              </span>
            ) : null}
          </Slot>
          <span className="prefix">{prefixText}</span>
          <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            max={max}
            min={min}
            maxLength={maxlength}
            minLength={minlength}
            required={required}
            step={step}
            onChange={doChange}

          />
          <span className="suffix">{suffixText}</span>
        </Field>
      </div>
    </div>
  );
};
