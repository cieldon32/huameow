import { FieldComponent, Variant } from '@/base/default.interface';
export interface FieldProps<V> extends FieldComponent<V> {
    label?: string;
    rulers?: any;
    variant?: Variant;
    prefixText?: string;
    suffixText?: string;
}
