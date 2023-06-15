import type { BaseCompaonentProps, ForwardComponent } from '@/base/default.interface';
export interface DialogProps extends BaseCompaonentProps {
    hasFooter?: boolean;
    stacked?: boolean;
    transition?: 'grow-down' | 'grow-up' | 'grow-left' | 'grow-right' | 'grow' | '' | 'shrink';
}
export interface DialogComponent extends ForwardComponent<any, any> {
}
