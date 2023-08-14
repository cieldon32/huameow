import type { BaseCompaonentProps, ForwardComponent, Position } from '@/base/default.interface';
export interface LayoutProps extends BaseCompaonentProps {
    navs?: any[];
    dir?: 'column' | 'row';
    active?: string;
    position?: Position;
}
export interface LayoutComponent extends ForwardComponent<any, any> {
}
