import {CSS_CLASSES} from './constants';
import './style/index.scss';

export const Grid = ({children}: any) => {
  return (
    <div className={CSS_CLASSES.ROOT}>
      {children}
    </div>
  )
}

Grid.Row = ({children}: any) => (
  <div className={CSS_CLASSES.ROW}>{children}</div>
)

Grid.Cell = ({children}: any) => (
  <div className={CSS_CLASSES.CELL}>{children}</div>
)
