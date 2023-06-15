import type{FieldComponent, ForwardComponent, RangeComponent} from '@/base/default.interface';

export interface SliderProps extends FieldComponent<number>, RangeComponent {
  range?: boolean;
  hasTickMarks?: boolean;
  valueStart?: number;
  valueEnd?: number;
  valueLabel?: string;
  valueStartLabel?: string;
  valueEndLabel?: string;
}

export interface SliderComponent extends ForwardComponent<any, any>{

}
