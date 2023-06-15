import { ForwardComponent, FieldComponent } from '@/base/default.interface';
import { List } from '@/list';
export interface MenuComponent extends ForwardComponent<any, any> {
    Item?: typeof List.Item;
    SubMenu?: any;
}
export interface MenuProps extends FieldComponent<string[]> {
    multiple?: boolean;
    fixed?: boolean;
    hasOverflow?: boolean;
}
