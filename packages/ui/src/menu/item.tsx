import type{FieldComponent} from '@/base/default.interface';
import {List} from '@/list';
import {MenuContext} from './provider';

export const Item = ({children, value}: FieldComponent<string>) => {
  return (
    <MenuContext.Consumer>
      {({ setOpen, onChange }: any) => {
        function doClick() {
          setOpen(false);
          onChange?.(value);
        }
        return (
          <List.Item onClick={doClick}>{children}</List.Item>
        )
      }}
    </MenuContext.Consumer>
  );
};
