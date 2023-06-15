import { ForwardComponent, FieldComponent } from '@/base/default.interface';
export interface ProgressComponent extends ForwardComponent<any, any> {
}
export interface ProgressProps extends FieldComponent<number> {
    buffer?: number;
    indeterminate?: boolean;
    fourColors?: boolean;
    text?: string;
    type?: 'linear' | 'circular';
}
