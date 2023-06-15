import type { BaseCompaonentProps, ForwardComponent } from '@/base/default.interface';
export interface LayoutProps extends BaseCompaonentProps {
    config?: any;
    dir?: 'column' | 'row';
    active?: string;
}
export interface LayoutComponent extends ForwardComponent<any, any> {
}
