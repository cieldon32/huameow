export const reduce = (adaptKey: Function, arr: any[], phrase: string): any => {
  let len = arr.length;
  if (len > 1) {
    len = len >> 1;
    return phrase > adaptKey(arr[len - 1].last_word)
              ? reduce(adaptKey, arr.slice(len), phrase)
              : reduce(adaptKey, arr.slice(0, len), phrase);
  } else {
    return arr[0];
  }
}