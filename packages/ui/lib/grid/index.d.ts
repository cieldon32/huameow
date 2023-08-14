import type { BaseCompaonentProps } from '@/base/default.interface';
import { GridProps } from './interface';
import './style/index.scss';
export declare const Grid: {
    ({ children, className }: GridProps): import("react/jsx-runtime").JSX.Element;
    Row({ children, className }: BaseCompaonentProps): import("react/jsx-runtime").JSX.Element;
    Cell({ children, className }: BaseCompaonentProps): import("react/jsx-runtime").JSX.Element;
};
