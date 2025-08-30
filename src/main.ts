import * as core from '@actions/core';
import { getArticles, writeFeed } from './utils.js';
import type { ForemApi } from './utils.d.js';

/**
 * The main function for the action.
* @returns {void} - Resolves when the action is complete.
 */
export const run = async (): Promise<void> => {
  try {
    const articles: ForemApi = await getArticles();
    await writeFeed(articles);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
};
