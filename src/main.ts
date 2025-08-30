import * as core from '@actions/core';
import { getArticles } from './lib/utils/get.js';
import { writeFeed } from './lib/utils/write.js';

export const run = async (): Promise<void> => {
  try {
    const articles = await getArticles();
    const feed = await writeFeed(articles);
  } catch (error) {
    throw new Error(`Error: ${error.message}.`);
  }
};
