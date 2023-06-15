export const CSS_CLASSES = {
  ROOT: 'mdc-ripple',
  SURFACE: 'surface',
  UNBOUNDED: 'unbounded',
  FOCUSED: 'focused',
  HOVERED: 'hovered',
  ACTIVED: 'actived'
};

export enum State {
  INACTIVE,
  TOUCH_DELAY,
  HOLDING,
  WAITING_FOR_CLICK
}

export const PRESS_GROW_MS = 450;
export const MINIMUM_PRESS_MS = 225;
export const INITIAL_ORIGIN_SCALE = 0.2;
export const PADDING = 10;
export const SOFT_EDGE_MINIMUM_SIZE = 75;
export const SOFT_EDGE_CONTAINER_RATIO = 0.35;
export const PRESS_PSEUDO = '::after';
export const ANIMATION_FILL = 'forwards';
