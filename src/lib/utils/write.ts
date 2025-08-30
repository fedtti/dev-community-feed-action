import { writeFile } from 'fs/promises';
import type { DevApi } from './../../types/get.d.js';

export const writeFeed = async (articles: DevApi): Promise<void> => {
  try {
    const data = ''; // TODO: @fedtti
    const feed = await writeFile('./dist/feed.xml', data);
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};
