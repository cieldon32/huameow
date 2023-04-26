import React, { ReactNode } from "react";
export interface BaseCompaonentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode | string;
    id?: string;
    description?: string;
    title?: string;
}
export interface RippledComponentProps<T> {
    unbounded?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    onMouseDown?: React.MouseEventHandler<T>;
    onMouseUp?: React.MouseEventHandler<T>;
    onTouchStart?: React.TouchEventHandler<T>;
    onTouchEnd?: React.TouchEventHandler<T>;
    onKeyDown?: React.KeyboardEventHandler<T>;
    onKeyUp?: React.KeyboardEventHandler<T>;
    onFocus?: React.FocusEventHandler<T>;
    onBlur?: React.FocusEventHandler<T>;
    computeBoundingRect?: (surface: T) => ClientRect;
}
export interface InjectedProps<S, A = Element> extends RippledComponentProps<S> {
    initRipple?: React.Ref<S> | ((surface: S | null, activator?: A | null) => void);
}
