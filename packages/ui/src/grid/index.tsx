import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import './style/index.scss';

export const Grid = ({children}: BaseCompaonentProps) => {
  return (
    <div className={CSS_CLASSES.ROOT}>
      {children}
    </div>
  )
}

Grid.Row = ({children}: BaseCompaonentProps) => (
  <div className={CSS_CLASSES.ROW}>{children}</div>
)

Grid.Cell = ({children}: BaseCompaonentProps) => (
  <div className={CSS_CLASSES.CELL}>{children}</div>
)
