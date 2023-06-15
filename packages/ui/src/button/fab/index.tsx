import classnames from 'classnames';
import {Button} from '@/button';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import './index.scss';

export const FAB = ({
  theme,
  className,
  children
}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    'primary': theme === 'primary',
    'secondary': theme === 'secondary',
    'tertiary': theme === 'tertiary',
  });

  return (
    <Button className={classNames}>
      {children}
    </Button>
  )
}
