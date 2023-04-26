import { curry, reduce} from 'ramda';


export const pickWhen: any = curry(function(key: string, reduceFn: Function, arr: any[]){
  const fn = reduce((acc: any, cur: any) => {
    if (cur.type === key) {
      acc = reduceFn(acc, cur);
    } else if (cur.children && cur.children.length) {
      acc = acc.concat(fn([], cur.children));
    }
    return acc;
  });
  return fn([], arr);
})
