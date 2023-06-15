import { ForwardComponent, BaseCompaonentProps } from '@/base/default.interface';
import { List } from '@/list';
export interface NavComponent extends ForwardComponent<any, any> {
    Item?: typeof List.Item;
    SubMenu?: any;
}
export interface TabProps extends BaseCompaonentProps {
    icon?: string;
    active?: boolean;
}
