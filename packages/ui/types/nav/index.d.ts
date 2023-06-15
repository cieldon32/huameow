import type { BaseCompaonentProps } from '@/base/default.interface';
import './style/index.scss';
export declare const Nav: {
    ({ className, children, ...props }: BaseCompaonentProps): import("react/jsx-runtime").JSX.Element;
    Tab: ({ children, className, icon, active }: import("./interface").TabProps) => import("react/jsx-runtime").JSX.Element;
};
