import {
  useState,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames';
import { Elevation } from '@/elevation';
import { useSlot } from '@/slot';
import { Button } from '@/button';
import {Icon} from '@/icon';
import { CSS_CLASSES } from './constants';
import { DialogProps, DialogComponent } from './interface';
import './index.scss';

export const Dialog : DialogComponent = forwardRef(
  (
    {
      hasFooter,
      stacked,
      className,
      children,
      transition = 'grow-down',
      title,
      visiable,
      isMessage = false,
      width,
      height,
    }: DialogProps,
    ref: any,
  ) => {
    const slots = useSlot(children);
    const [dragging, setDragging] = useState(false);
    const [open, setOpen] = useState(visiable);
    const [opening, setOpening] = useState(false);
    const [closing, setClosing] = useState(false);
    const contentElement = useRef(null);
    const { isScrollable, isAtScrollTop, isAtScrollBottom } = useMemo(() => {
      return {
        isScrollable: false,
        isAtScrollTop: false,
        isAtScrollBottom: false,
      };
    }, [contentElement.current]);
    const classNames = useMemo(() => {
      return classnames(CSS_CLASSES.ROOT, className, {
        ['hasMask']: !isMessage,
        ['stacked']: stacked,
        ['scrollable']: isScrollable,
        ['scroll-divider-header']: !isAtScrollTop,
        ['scroll-divider-footer']: !isAtScrollBottom,
        ['footerHidden']: !hasFooter,
        ['opening']: opening,
        ['closing']: closing,
        ['transition']: transition,
        ['grow-down']: transition === 'grow-down',
        ['grow-up']: transition === 'grow-up',
        ['grow-left']: transition === 'grow-left',
        ['grow-right']: transition === 'grow-right',
        ['shrink']: transition === 'shrink',
        ['grow']: transition === 'grow',
      });
    }, [opening]);

    const container = useMemo(() => {
      return classnames('container', {
        dragging: dragging,
      });
    }, [dragging]);

    function doPointerMove(e: PointerEvent) {
      console.log('doPointerMove', e);
      // if (!dragging && !this.canStartDrag(e) || !this.containerElement) {
      //   return;
      // }
      // const {top, left, height, width} =
      //     this.containerElement.getBoundingClientRect();
      // if (!this.dragging) {
      //   this.containerElement.setPointerCapture(e.pointerId);
      //   this.dragging = true;
      //   const {x, y} = e;
      //   this.dragInfo = [x, y, top, left];
      // }
      // const [sx, sy, st, sl] = this.dragInfo ?? [0, 0, 0, 0];
      // const dx = e.x - sx;
      // const dy = e.y - sy;
      // const ml = window.innerWidth - width - this.dragMargin;
      // const mt = window.innerHeight - height - this.dragMargin;
      // const l = Math.max(this.dragMargin, Math.min(ml, dx + sl));
      // const t = Math.max(this.dragMargin, Math.min(mt, dy + st));
      // this.style.setProperty('--_container-drag-inline-start', `${l}px`);
      // this.style.setProperty('--_container-drag-block-start', `${t}px`);
    }

    function doDragEnd(e: PointerEvent) {
      console.log('doDragEnd', e)
      setDragging(false);
    }

    function doOpen() {
      setOpen(true);
      setOpening(true);
    }

    function doClose() {
      setOpen(false);
      setOpening(false);
      setClosing(true);
    }

    useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            doOpen();
          },
          close() {
            doClose();
          },
        };
      },
      [],
    );

    return (
      <dialog className={classNames} open={open}>

        {
          isMessage ? children : (
            <div
            className={container}
            style={{width, height}}
            onPointerMove={() => doPointerMove}
            onPointerUp={() => doDragEnd}
          >

            <Elevation></Elevation>
            <div className="header">
                {slots['title'] || title}
                <Button type="icon" onClick={doClose} className="close">close</Button>
              </div>

            <div className="content" ref={contentElement}>
              {slots['children']}
            </div>
            <footer className="footer">
              {slots['footer']}
              <Button variant="tonal" onClick={doClose}>
                取消
              </Button>
              <Button variant="filled" onClick={doClose}>
                确定
              </Button>
            </footer>
          </div>
          )
        }


      </dialog>
    );
  },
);

Dialog.Container = ({children, type}: any) => (
  <div className="content">
  <Icon>{type}</Icon>
  <span>{children}</span>
</div>
)
