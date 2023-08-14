/// <reference types="react" />
import { TabsProps } from './interface';
import './style/tabs.scss';
export declare function Tabs({ className, children, state, variant, value, onChange }: TabsProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Tabs {
    var Tab: import("react").ForwardRefExoticComponent<Omit<any, "ref"> & import("react").RefAttributes<unknown>>;
}
