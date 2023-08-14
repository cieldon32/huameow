import { NavProps } from './interface';
import './style/index.scss';
export declare const Nav: {
    ({ className, children, ...props }: NavProps): import("react/jsx-runtime").JSX.Element;
    Tab: ({ children, className, icon, name }: import("./interface").TabProps) => import("react/jsx-runtime").JSX.Element;
};
