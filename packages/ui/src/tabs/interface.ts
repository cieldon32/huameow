import type{ BaseCompaonentProps} from '@/base/default.interface';

export interface TabsProps extends BaseCompaonentProps {
  state: 'primary' | 'secondary' | 'vertical';
  variant: 'indicator' | 'bar';
  value?: string;
  onChange: Function;
}
