import {useState} from 'react';
import classnames from 'classnames';
import {Icon} from '@/icon';
import type{NavRailProps} from './interface';
import './styles.scss';

export const NavRail = ({
  dataSource = [],
  className,
  children,
  ...props
}: NavRailProps) => {
  const classNames = classnames('mdc-navigation-rail', className, {

  });
  const [active, setActive] = useState('');

  function doActive(name: string) {
    setActive(name);
  }
  return (
    <div className={classNames} {...props}>
      <nav className='content'>
      {
        dataSource.map(({icon, title, name}: any) => (
          <a className={`${active === name} ? 'active' : ''`} onClick={() => doActive(name)}>
            <Icon className='icon'>{icon}</Icon>
            <span>{title}</span>
          </a>
        ))
      }
      </nav>
      <div className='tools'>{children}</div>
    </div>
  )
}


