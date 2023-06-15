import { FieldComponent, BaseCompaonentProps } from '@/base/default.interface';
export interface RadioProps extends BaseCompaonentProps, Pick<FieldComponent<boolean>, 'value' | 'name' | 'required' | 'errorText'> {
}
