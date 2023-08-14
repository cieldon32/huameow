import type { BaseCompaonentProps, ForwardComponent } from '@/base/default.interface';
export interface DialogProps extends BaseCompaonentProps {
    isMessage?: boolean;
    visiable?: boolean;
    hasFooter?: boolean;
    stacked?: boolean;
    transition?: 'grow-down' | 'grow-up' | 'grow-left' | 'grow-right' | 'grow' | '' | 'shrink';
    width?: string;
    height?: string;
}
export interface DialogComponent extends ForwardComponent<any, any> {
    Container?: any;
}
