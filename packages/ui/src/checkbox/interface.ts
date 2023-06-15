import {FieldComponent, BaseCompaonentProps} from '@/base/default.interface';

export interface CheckboxProps extends Pick<FieldComponent<boolean>, 'value' | 'name' | 'required' | 'errorText'>, BaseCompaonentProps {
  indeterminate?: string;
}
