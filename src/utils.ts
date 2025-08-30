import { writeFile } from 'fs/promises';
import type { ForemApi } from './utils.d.js';

export const getArticles = async (): Promise<ForemApi> => {
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
    const result: ForemApi = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};

export const writeFeed = async (articles: ForemApi): Promise<void> => {
  try {
    const data = `
      <?xml version="1.0" encoding="utf-8"?>
      <feed xmlns="http://www.w3.org/2005/Atom">
        <title>Federico Moretti AKA “fedtti”</title>
        <link href=""/>
      </feed>
    `;
    const feed = await writeFile('./dist/feed.xml', data);
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};
