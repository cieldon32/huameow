import classnames from 'classnames';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import {GridProps} from './interface';
import './style/index.scss';

export const Grid = ({children, className}: GridProps) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
  });
  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

Grid.Row = ({children, className}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.ROW, className);
  return (
    <div className={classNames}>{children}</div>
  )
}

Grid.Cell = ({children, className}: BaseCompaonentProps) => {
  const classNames = classnames(CSS_CLASSES.CELL, className);
  return (
    <div className={classNames}>{children}</div>
  )
}
