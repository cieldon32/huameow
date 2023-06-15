import {ForwardComponent, BaseCompaonentProps, Position} from '@/base/default.interface';

export interface BadgeComponent extends ForwardComponent<BadgeProps, any>{

}


export interface BadgeProps extends Omit<BaseCompaonentProps, 'direction'>{
  position?: Position
}
