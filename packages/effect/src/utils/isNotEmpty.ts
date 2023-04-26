import { isEmpty } from 'ramda';
export const isNotEmpty = (n: string) => {
  return !isEmpty(n);
};
