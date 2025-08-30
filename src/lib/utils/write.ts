import { writeFile } from 'fs/promises';
import type { DevApi } from './get.d.js';

export const writeFeed = async (articles: DevApi): Promise<void> => {
  try {

  } catch (error) {
    throw new Error(`Error: ${error.message}.`);
  }
};
