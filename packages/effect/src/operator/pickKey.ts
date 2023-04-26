import { curry, is, isEmpty } from 'ramda';


export const pickKey: any  = curry(function(key: string, data: any){
  let result;

  function getData(obj: any) {
    Object.keys(obj).some((curr) => {
      const current = obj[curr];
      if (curr === key) {
        result = obj[curr];
      } else if (is(Object, current) && !isEmpty(current)) {
        getData(current);
      }
      return curr === 'c';
    });
  }
  getData(data);
  return result;
});

