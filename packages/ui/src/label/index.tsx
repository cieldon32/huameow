import classnames from 'classnames';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import './index.scss';

export const Label = ({children, className}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
  });
  return (
    <label className={classNames}>
      {children}
    </label>
  )
}
