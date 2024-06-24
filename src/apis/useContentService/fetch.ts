import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {
    'Content-Type': 'application/json'
  },
  interceptors: {
    response: async (response) => {
      const result = await response.json();
      if (!response.ok) {
        console.log('▷▶▷▶ response error', result);
      }
      return result;
    }
  }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const fetchData = async (url: string) => {
  const authToken = getAuthToken();
  const response = await fetchService(url, {
    method: 'GET',
    headers: {
      'authorization-token': authToken
    }
  });
  return returnData(response);
};

const articleService = {
  getArticles: async (userId: string, page: number) => {
    const url = `/api/v1/articles/${userId}?page=${page}`;
    return fetchData(url);
  }
};

const bookmarkService = {
  getBookmarks: async (userId: string, page: number) => {
    const url = `/api/v1/bookmarks/${userId}?page=${page}`;
    return fetchData(url);
  }
};

export { articleService, bookmarkService };
