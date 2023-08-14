import type { BaseCompaonentProps, ACompaonentProps } from '@/base/default.interface';
export interface FABProps extends BaseCompaonentProps, ACompaonentProps {
    state?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
}
