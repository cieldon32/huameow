import { useState, useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import classnames from 'classnames';
import {List} from '@/list';
import {Elevation} from '@/elevation';
import { Focus } from '@/focus';
import {CSS_CLASSES} from './constants';
import {MenuContext} from './provider';
import {Item} from './item';
import {useMenu} from '@/hooks/useMenu';
import {MenuComponent, MenuProps} from './interface';
import './index.scss';


export const Menu: MenuComponent = forwardRef(({
  hasOverflow,
  fixed,
  className,
  onChange,
  children,
  multiple,
  ...props
}: MenuProps, ref: any) => {
  const parent = useRef(null);
  const {value, doSelect} = useMenu({multiple, value: props.value});
  const [open, setOpen] = useState(false);
  const classNames = classnames(CSS_CLASSES.ROOT, className)
  const menu = useMemo(() => {
    return classnames('menu', {
      ['open']: open,
      ['fixed']: fixed,
      ['has-overflow']: hasOverflow,
    })
  }, [open]);

  useImperativeHandle(ref, () => {
    return {
      open() {setOpen(true)},
      close() {setOpen(false)},
    };
  }, []);

  function doChangeItem(v: string) {
    doSelect(v);
    onChange?.(v);
  }
  useEffect(() => {
    console.log('value', value)
    // if(value !== props.value){
    //   onChange?.(value)
    // }
  }, [value]);

  return (
    <MenuContext.Provider value={{open, setOpen, onChange: doChangeItem}}>
      <div className={classNames}>
        <div className={menu}>
          <Elevation></Elevation>
          <List>{children}</List>
          <Focus parent={parent}></Focus>
        </div>
      </div>
    </MenuContext.Provider>

  );
})

Menu.Item = Item;
