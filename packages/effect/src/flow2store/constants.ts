import {
  fromEvent
} from 'rxjs';
import { random } from '@/utils';

export const FnsMap: Record<string, Function> = {
  random: random,
};

export const TargetMap: Record<string, any> = {
  window: window,
  document: document,
};


export const EventMap: Record<string, Function> = {
  click: fromEvent,
  load: fromEvent,
  keyup: fromEvent,
};
