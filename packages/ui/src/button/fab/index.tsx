import classnames from 'classnames';
import {Button} from '@/button';
import {FABProps} from './interface';
import {CSS_CLASSES} from './constants';
import './index.scss';

export const FAB = ({
  state,
  className,
  children
}: FABProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    'primary': state === 'primary',
    'secondary': state === 'secondary',
    'tertiary': state === 'tertiary',
  });

  return (
    <Button className={classNames}>
      {children}
    </Button>
  )
}
