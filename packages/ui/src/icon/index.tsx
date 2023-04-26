import React from 'react';
import {is} from 'ramda';
import paths from './paths';
import {Icon as Ic} from './icon';
import {IconStack} from './stack';
import {IconProps} from './interface';

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({
  path,
  color,
  className,
  ...props
}, ref) => {
  const getPath = (name: keyof typeof paths) => {
    return paths[name] || name;
  }
  return (
    <span className={className}>
      {
        is(String, path) ? (
          <Ic path={getPath(path)} color={color} ref={ref} {...props} />
        ) : null
      }
      {
        is(Array, path) ? (
          <IconStack color={is(Array, color) ? null : color} ref={ref} {...props}>
            {
              path.map((p: any, index) => (
                <Ic path={getPath(p)} color={is(Array, color) ? color[index]:  null} />
              ))
            }
          </IconStack>
        ) : null
      }
    </span>
  )
});

Icon.displayName = 'Icon';

export default Icon;
