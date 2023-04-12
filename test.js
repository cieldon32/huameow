function getMost(s) {
  const list = s.trim().split('');
  if(!list.length) {
    return '';
  }
  let result = {};
  for(let i = 0; i < list.length; i++) {
    result[list[i]] = result[list[i]] ? result[list[i]] + 1 : 1;
  }
  const max = Math.max(Object.values(result));
  const res = Object.keys(result).filter((item) => result[item] === max)[0];
  return res;
}
