import type { Variant, BaseCompaonentProps, ACompaonentProps } from '@/base/default.interface';
export interface ChipProps extends BaseCompaonentProps, ACompaonentProps {
    variant?: Variant;
    type?: 'filter' | 'assist' | 'input' | 'suggestion';
    multiple?: boolean;
}
