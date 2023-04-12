import { Input } from '../commands';

export const exit = (code = 0) => {
  process.exit(code);
};

export const getOptionValue = (name: string, inputs: Input[]): string => {
  const idInput: Input = inputs.find(
    (input: { name: string }) => input.name === name,
  ) as Input;

  return idInput ? (idInput.value as string) : ('' as string);
};