import { passRegExp, userRegExp } from '../data/constants';

export default function isPassValid(password: string): boolean {
  const regex = passRegExp;
  return regex.test(password);
}

export function isNameLoginValid(input: string): boolean {
  const regex = userRegExp;
  return regex.test(input);
}
