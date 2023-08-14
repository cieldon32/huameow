import { FieldProps } from '@/field/interface';
export interface SelectProps extends FieldProps<any> {
    type?: "menu" | "select";
}
