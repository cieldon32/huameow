import { unified } from 'unified';
import remarkParse from 'remark-parse';
// import { fromEvent } from 'rxjs';

import { reduceNode } from './reduceNode';
import { reduceList } from './reduceList';
import { transformToStore } from './transformToStore';



// const TargetMap: Record<string, any> = {
//   window: window,
//   document: document,
// };

// const CreateMap: Record<string, Function> = {
//   fromEvent: fromEvent,
// };

export function createStore(flow: string, apis: any) {
  const node = unified().use(remarkParse).parse(flow);
  const list = reduceNode(node);
  const data = reduceList(list as any);
  const result = transformToStore(data, apis);
  return result
}
