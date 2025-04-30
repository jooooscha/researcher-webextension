import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

import { bgCyan, black } from 'kolorist';

export const port = parseInt(process.env.PORT || '', 10) || 3303;
export const r = (...args: string[]): string => {
  console.log("args:", args)
  const f = fileURLToPath(import.meta.url);
  return resolve(path.dirname(f), '..', ...args)
};
export const isDev = process.env.NODE_ENV !== 'production';

export function log(name: string, message: string): void {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message);
}
