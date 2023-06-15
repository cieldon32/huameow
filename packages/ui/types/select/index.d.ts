import { SelectProps } from './interface';
import './style/index.scss';
export declare const Select: {
    ({ variant, prefixText, defalutValue, required, label, error, errorText, disabled, className, children, }: SelectProps): import("react/jsx-runtime").JSX.Element;
    Option: (({ disabled, className, children, ...props }: import("../base/default.interface").BaseCompaonentProps) => import("react/jsx-runtime").JSX.Element) | undefined;
};
