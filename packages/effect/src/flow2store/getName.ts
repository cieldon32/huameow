
export function getName(str?: string) {
  if(!str) {
    return {}
  }
  const list = str.split('(');
  return {
    name: list[1],
    flowId: list[0],
  }
}
