import React from 'react';
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react';

export interface BaseCompaonentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode | string;
  id?: string;
  description?: string;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  parent?: any;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
  size?: 's' | 'm' | 'l';
  direction?: 'row' | 'column';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface ACompaonentProps {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
}

export interface ForwardComponent<P, H>
  extends React.ForwardRefExoticComponent<P & React.RefAttributes<H>> {}

export type Variant = 'filled' | 'elevated' | 'tonal' | 'outlined';

export type Position = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'top-center' | 'bottom-center' | 'center';

export interface Ruler {
  required?: boolean;
  message?: string;
  pattern?: string | RegExp;
  validator?: Function;
}
export interface FieldComponent<V> extends BaseCompaonentProps {
  value?: V;
  defalutValue?: V;
  type?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  placeholder?: string;
  rulers?: Ruler[];
  pattern?: string | RegExp;
  onChange?: (v: any) => void;
}

export interface RangeComponent {
  max?: number;
  min?: number;
  step?: number;
}

export interface TextComponent {
  maxlength?: number;
  minlength?: number;
}
