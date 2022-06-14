import got from 'got';
import { BACKEND_APPLICATION_URL, BACKEND_URL } from '../lib/constants';
import { error } from '../logger';

export async function searchApplication(appID: string): Promise<any> {
  const response = await got.get(`${BACKEND_APPLICATION_URL}/${appID}`);

  // eslint-disable-next-line eqeqeq
  if (response.statusCode == 200) {
    const body = JSON.parse(response.body);

    if (body.ok) {
      return body.data;
    }
    error(body.message);
    return null;
  }

  error(`Error while searching application - ${response.statusCode.toString().bold}`);
  return null;
}

export async function findApplication(query: string): Promise<any> {
  // dev(`fetching - ${`${BACKEND_URL}/applications/search?q=${query}`.bold}`);
  const response = await got.get(`${BACKEND_URL}/applications/search?q=${query}`);

  // eslint-disable-next-line eqeqeq
  if (response.statusCode == 200) {
    const body = JSON.parse(response.body);

    return body;
  }
  error(`Error while searching application - ${response.statusCode.toString().bold}`);
  return null;
}
