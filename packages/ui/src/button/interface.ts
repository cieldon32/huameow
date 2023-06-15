
import type{Variant, BaseCompaonentProps, ACompaonentProps, ForwardComponent} from '@/base/default.interface';
import {SegmentedButton} from './segmentedButton';

export interface ButtonProps extends BaseCompaonentProps, ACompaonentProps {
  flipIcon?: boolean;
  toggle?: boolean;
  variant?: Variant;
  type?: 'link' | 'icon' | 'segment';
  multiple?: boolean;
}

export interface ButtonComponent extends ForwardComponent<any, any>{
  Item?: typeof SegmentedButton
}
