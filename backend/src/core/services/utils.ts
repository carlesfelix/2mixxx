import { customAlphabet } from 'nanoid';

export function getRandomCode(opts: { alphabet: string, size: number }): string {
  const { alphabet, size } = opts;
  const nanoid = customAlphabet(alphabet, size);
  return nanoid();
}
