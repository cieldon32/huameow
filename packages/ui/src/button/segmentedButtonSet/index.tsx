import { forwardRef, useState, useImperativeHandle } from 'react';
import classnames from 'classnames';
import { SegmentContext } from './provider';
import { CSS_CLASSES } from './constants';
import { SegmentedComponent } from './interface';
import './index.scss';

export const SegmentedButtonSet: SegmentedComponent = forwardRef(
  ({ multiple, className, children }: any, ref: any) => {
    const [selected, setSelected] = useState<string[]>([]);
    const classNames = classnames(CSS_CLASSES.ROOT, className, {});
    function doSelect(key: string) {
      if (multiple) {
        setSelected(res => Array.from(new Set(res.concat([key]))));
      } else {
        setSelected([key]);
      }
    }

    function updateSelect(key: string) {
      setSelected(res => Array.from(new Set(res.concat([key]))));
    }

    useImperativeHandle(
      ref,
      () => {
        return {};
      },
      [],
    );

    return (
      <SegmentContext.Provider value={{ selected, doSelect, updateSelect }}>
        <span role="group" ref={ref} className={classNames}>
          {children}
        </span>
      </SegmentContext.Provider>
    );
  },
);
