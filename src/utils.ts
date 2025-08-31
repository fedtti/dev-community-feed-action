import * as core from '@actions/core';
import { writeFile } from 'fs/promises';
import type { Article } from './utils.d.js';

export const getArticles = async (): Promise<Article[]> => {
  try {
    const apiUrl: string = process.env.API_URL!;
    const apiKey: string = process.env.API_KEY!;
    const response: Response = await fetch(`${apiUrl}?page=1&per_page=10`, {
      method: 'GET',
      headers: {
        'API-KEY': apiKey,
        'Accept': 'application/vnd.forem.api-v1+json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`Response: ${response.statusText}.`);
    }
    const result: Article[] = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};

export const writeFeed = async (articles: Article[]): Promise<void> => {
  try {
    const entries = (articles: Article[]) => {
      return articles.map((article: Article) => {
        return `  <entry>\n    <title>${JSON.stringify(article.title).replace(/"/g, '')}</title>\n    <link>${JSON.stringify(article.url).replace(/"/g, '')}</link>\n    <id></id>\n    <updated>${JSON.stringify(article.published_at).replace(/"/g, '')}</updated>\n  </entry>`;
      }).join('\n');
    };
    const authorName: string = core.getInput('author-name');
    const authorNickname: string = core.getInput('author-nickname');
    const feedLink: string = core.getInput('feed-link');
    const data = `<?xml version="1.0" encoding="utf-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title>${authorName} AKA “${authorNickname}”</title>\n  <link rel="self" href="${feedLink}/feed.xml"/>\n  <updated>${new Date().toISOString()}</updated>\n  <id></id>\n${entries(articles)}\n</feed>\n`;
    await writeFile('feed.xml', data); // TODO: @fedtti
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};
