import { curry } from 'ramda';

export const toBoolean: any = curry(function(str: string){
  const isBoolean = str === 'true' || str === 'false';
  return isBoolean ? str === 'true' : str;
});
