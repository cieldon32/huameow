import { forwardRef } from 'react';
import classnames from 'classnames';
// import {is, difference} from 'ramda';
import {Nav} from '@/nav';
import {CSS_CLASSES} from './constants';
import {LayoutProps} from './interface';
import './style/index.scss';


export const Layout = forwardRef(({
  config: {navs},
  dir = 'row',
  active,
  className,
  children
}: LayoutProps, ref: any) => {
  const classNames = classnames(CSS_CLASSES.ROOT, className, {
    [CSS_CLASSES.COLUMN]: dir === 'column',
    [CSS_CLASSES.ROW]: dir === 'row',
  });
  // const list = Children.toArray(children);
  // const slots = list.filter((child: any) => !is(String, child) && child.props.slot);
  // const childs = difference(list, slots);
  // const nav = slots.filter((child: any) => child.props.slot === 'nav');
  return (
    <div className={classNames} ref={ref}>
      <header>
        <div>logo</div>
        <Nav>
          {
            navs.map((nav: any) => (
              <Nav.Tab
                active={nav.value === active}
                icon={nav.icon}
                key={nav.value}
              >
                {nav.label}
              </Nav.Tab>
            ))
          }
        </Nav>
      </header>
      <section>
      {children}
      </section>
    </div>
  )
})
