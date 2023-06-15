import { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import type{BaseCompaonentProps} from '@/base/default.interface';
import {CSS_CLASSES} from './constants';
import './index.scss';

export const Focus = ({
  parent,
  className,
}: BaseCompaonentProps) => {
  const [visible, setVisible] = useState(false)
  const classNames = useMemo(() => {
    return classnames(CSS_CLASSES.ROOT, className, {
      [CSS_CLASSES.VISIBLE]: visible
    });
  }, [visible])

  useEffect(() => {
    if(parent.current) {
      parent.current.onmousedown = () => {
        setVisible(true);
      }
      parent.current.onmouseup = () => {
        setVisible(false);
      }
    }

  }, [parent.current])

  return (
    <div className={classNames}></div>
  )
}
