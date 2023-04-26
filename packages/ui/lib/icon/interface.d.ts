import { RefObject } from "react";
import paths from './paths';
import { BaseCompaonentProps } from '../base/default.interface';
export interface IconProps extends BaseCompaonentProps {
    path: keyof typeof paths | keyof typeof paths[];
    ref?: RefObject<SVGSVGElement>;
    size?: number | string | null;
    color?: string | string[] | null;
    horizontal?: boolean;
    vertical?: boolean;
    rotate?: number;
    spin?: boolean | number;
    inStack?: boolean;
}
export interface IconStackProps extends BaseCompaonentProps {
    ref?: RefObject<SVGSVGElement>;
    size?: number | string | null;
    color?: string | null;
    horizontal?: boolean;
    vertical?: boolean;
    rotate?: number;
    spin?: boolean | number;
}
