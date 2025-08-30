import * as core from '@actions/core';
import { getArticles, writeFeed } from './utils.js';

export const run = async (): Promise<void> => {
  try {
    const articles = await getArticles();
    const feed: void = await writeFeed(articles);
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};
