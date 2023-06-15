export declare const CSS_CLASSES: {
    ROOT: string;
    SURFACE: string;
    UNBOUNDED: string;
    FOCUSED: string;
    HOVERED: string;
    ACTIVED: string;
};
export declare enum State {
    INACTIVE = 0,
    TOUCH_DELAY = 1,
    HOLDING = 2,
    WAITING_FOR_CLICK = 3
}
export declare const PRESS_GROW_MS = 450;
export declare const MINIMUM_PRESS_MS = 225;
export declare const INITIAL_ORIGIN_SCALE = 0.2;
export declare const PADDING = 10;
export declare const SOFT_EDGE_MINIMUM_SIZE = 75;
export declare const SOFT_EDGE_CONTAINER_RATIO = 0.35;
export declare const PRESS_PSEUDO = "::after";
export declare const ANIMATION_FILL = "forwards";
