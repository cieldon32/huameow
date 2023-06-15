import { TextComponent, RangeComponent } from '@/base/default.interface';
import { FieldProps } from '@/field/interface';
export interface TextFieldProps<V> extends RangeComponent, FieldProps<V>, TextComponent {
}
