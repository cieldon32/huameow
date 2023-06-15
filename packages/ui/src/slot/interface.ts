import {ReactElement, ReactNode} from 'react';

export interface SlotProps {
  children: ReactNode,
  title?: ReactNode,
  name: string,
}
export type SlotElement = ReactElement<SlotProps>;


export interface PartialNode {
  type?: string,
}

