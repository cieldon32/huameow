export const random = (args: string): string => {
  const list = args.split(',');
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};
