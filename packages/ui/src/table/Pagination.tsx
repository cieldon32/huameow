import classnames from 'classnames';
import { v4 } from 'uuid';
import { Button } from '@/button';
import './style/index.scss';
import { useEffect, useMemo, useState } from 'react';

export const Pagination = ({ className, total, page, onChange }: any) => {
  const [current, setCurrent] = useState(1);
  const classNames = classnames('mdc-pagination', className);
  const list = useMemo(() => {
    const res = [];
    for (let i = 0; i < total; i++) {
      res.push({
        text: i + 1,
        cls: classnames('mdc-pagination-page', {
          ['active']: current === i + 1,
        }),
      });
    }
    return res;
  }, [current]);

  function doPage(n: number) {
    setCurrent(n);
    onChange?.(n);

  }

  function doPrev() {
    const now = current - 1 > 0 ? current - 1 : 1
    setCurrent(now);
    onChange?.(now);
  }

  function doNext() {
    const now = current + 1 > total ? current - 1 : 1
    setCurrent(now);
    onChange?.(now);
  }

  useEffect(() => {
    setCurrent(page)
  }, [page])

  return (
    <div className={classNames}>
      <Button type="icon" className="mdc-pagination-page" onClick={doPrev}>
        arrow_back_ios
      </Button>
      {list.map(({ text, cls }) => (
        <Button
          className={cls}
          key={v4()}
          variant="outlined"
          onClick={() => doPage(text)}
        >
          {text}
        </Button>
      ))}
      <Button type="icon" className="mdc-pagination-page" onClick={doNext}>
        arrow_forward_ios
      </Button>
    </div>
  );
};
