import { forwardRef, useState } from 'react';
import classnames from 'classnames';
import { Button } from '../index';
import type { ButtonProps } from '@/button/interface';
import { CSS_CLASSES } from './constants';
import './style/index.scss';

export const SortButton = forwardRef(({ className, name, onChange }: ButtonProps, ref: any) => {
  const [selected, setSelected] = useState('');
  const classNames = classnames(CSS_CLASSES.ROOT, className, {});

  function doClick(dir: string) {
    setSelected(dir);
    onChange?.({dir, name});
  }

  return (
    <div className={classNames} ref={ref}>
      <Button
        type="icon"
        onClick={() => doClick('up')}
        active={selected === 'up'}
      >
        keyboard_arrow_up
      </Button>
      <Button
        type="icon"
        onClick={() => doClick('down')}
        active={selected === 'down'}
      >
        keyboard_arrow_down
      </Button>
    </div>
  );
});
