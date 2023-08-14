import type { FieldComponent } from '@/base/default.interface';
import {List} from '@/list';
import {MenuContext} from './provider';

export const Item = ({ children, value, onClick }: FieldComponent<string>) => {
  return (
    <MenuContext.Consumer>
      {({ setOpen, onChange }: any) => {
        function doClick(e: any) {
          if(onClick) {
            onClick(e);
          } else {
            onChange?.(value || children);
          }
          setOpen(false);
        }
        return (
          <List.Item onClick={doClick}>{children}</List.Item>
        )
      }}
    </MenuContext.Consumer>
  );
};
