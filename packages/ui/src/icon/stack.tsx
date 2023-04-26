import React from 'react';
import {IconProps, IconStackProps} from './interface';

let id = 0;

export const IconStack = React.forwardRef<SVGSVGElement, IconStackProps>(({
  title = null,
  description = null,
  size = null,
  color = 'currentColor',
  horizontal = null,
  vertical = null,
  rotate = null,
  spin = null,
  style = {},
  children,
  ...rest
}, ref) => {
  id++;
  let anySpin = spin === null ? false : spin;
  const childrenWithProps = React.Children.map(children, (child) => {
    const childElement = child as React.ReactElement<IconProps>;
    if (anySpin !== true) {
      anySpin = (spin === null ? childElement.props.spin : spin) === true;
    }
    let scaledSize = childElement.props.size;
    if (typeof size === 'number' && typeof childElement.props.size === 'number') {
      scaledSize = childElement.props.size / size;
    }
    const props: Partial<IconProps> = {
      size: scaledSize,
      color: color === null ? childElement.props.color : color,
      horizontal: horizontal === null ? childElement.props.horizontal : horizontal,
      vertical: vertical === null ? childElement.props.vertical : vertical,
      rotate: rotate === null ? childElement.props.rotate : rotate,
      spin: spin === null ? childElement.props.spin : spin,
      inStack: true
    };
    return React.cloneElement(childElement, props);
  });
  if (size !== null) {
    style.width = typeof size === "string"
      ? size
      : `${size * 1.5}rem`;
  }
  let ariaLabelledby;
  let labelledById = `stack_labelledby_${id}`;
  let describedById = `stack_describedby_${id}`;
  let role;
  if (title) {
    ariaLabelledby = description
      ? `${labelledById} ${describedById}`
      : labelledById;
  } else {
    role = 'presentation';
    if (description) {
      throw new Error("title attribute required when description is set");
    }
  }
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      style={style}
      role={role}
      aria-labelledby={ariaLabelledby}
      {...rest}>
      {title && <title id={labelledById}>{title}</title>}
      {description && <desc id={describedById}>{description}</desc>}
      {anySpin && (
        <style>
          {"@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }"}
          {"@keyframes spin-inverse { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }"}
        </style>
      )}
      {childrenWithProps}
    </svg>
  );
});
