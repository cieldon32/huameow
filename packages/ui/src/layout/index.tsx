import { forwardRef } from 'react';
import classnames from 'classnames';
import {Nav} from '@/nav/bar';
import { useSlot, Slot } from '@/slot';
import {AppBar} from './app-bar';
import {CSS_CLASSES} from './constants';
import {LayoutProps} from './interface';
import './style/index.scss';


export const Layout = forwardRef(({
  navs = [],
  dir = 'row',
  className,
  children
}: LayoutProps, ref: any) => {
  const slots = useSlot(children);
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.COLUMN]: dir === 'column',
    [CSS_CLASSES.ROW]: dir === 'row',
  });
  return (
    <div className={classNames} ref={ref}>
      <AppBar title={slots.title}>
        {
          navs?.length ? (
            <Nav>
          {
            navs.map((nav: any) => (
              <Nav.Tab
                icon={nav.icon}
                key={nav.value}
              >
                {nav.label}
              </Nav.Tab>
            ))
          }

        </Nav>
          ) : null
        }
        <Slot name="tools">{slots.tools}</Slot>
      </AppBar>
      <section>
      {children}
      </section>
    </div>
  )
})
