import classnames from 'classnames';
import { CSS_CLASSES } from './constants';
import {Item} from './item';
import './index.scss';

export const List = ({
  className,
  children
}: any) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {});
  return (
    <ul className={classNames}>
      {
       children
      }
    </ul>
  );
};

List.Item = Item;
