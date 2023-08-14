import { ForwardComponent, BaseCompaonentProps } from '@/base/default.interface';
export interface NavRailComponent extends ForwardComponent<any, any> {
}
export interface NavRailProps extends BaseCompaonentProps {
    dataSource: {
        name: string;
        icon: string;
        title: string;
    }[];
}
