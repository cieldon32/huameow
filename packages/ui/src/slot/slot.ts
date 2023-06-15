import {ReactElement} from 'react'
import {SlotProps} from './interface';

function Slot(_: SlotProps): ReactElement {
  return null as unknown as ReactElement;
}

Slot.getSlot = function* getCollectionNode(props: SlotProps): any {
  yield props.children;
};

let _Slot = Slot as (props: SlotProps) => JSX.Element;
export default _Slot;
