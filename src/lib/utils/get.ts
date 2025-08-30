import type { DevApi } from './../../types/get.d.js';

export const getArticles = async (): Promise<DevApi> => {
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
    const result: DevApi = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error: ${(error as Error).message}.`);
  }
};
