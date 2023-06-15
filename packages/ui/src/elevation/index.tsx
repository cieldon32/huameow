import classnames from 'classnames';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import './index.scss';



export const Elevation = ({
  className,
}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
  });

  return (
    <div className={classNames}>
      <div className='shadow'></div>
    </div>
  )
}
