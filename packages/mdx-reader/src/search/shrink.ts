export const shrink = (adaptKey: Function, arr: any, phrase: string): any => {
    let len = arr.length;
    let sub: any;
    if (len > 1) {
      len = len >> 1;
      var key = adaptKey(arr[len]);
      if (phrase < key) {
        sub = arr.slice(0, len);
        sub.pos = arr.pos;
      } else {
        sub = arr.slice(len);
        sub.pos = (arr.pos || 0) + len;
      }
      return shrink(adaptKey, sub, phrase);
    } else {
      return (arr.pos || 0) + (phrase <= adaptKey(arr[0]) ? 0 : 1);
    }
}