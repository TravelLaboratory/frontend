import { redirect } from 'next/navigation';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  default: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    interceptors: {
      response: async (response) => {
        const result = await response.json();
        if (!response.ok) {
          console.log('▷▶▷▶ response error', result);
          redirect('/');
        }
        return result;
      }
    }
  }
};

const fetchService = returnFetch(options.default);

const fetchData = async (url: string) => {
  const authToken = getAuthToken();
  const response = await fetchService(url, {
    method: 'GET',
    headers: {
      'authorization-token': authToken
    }
  });
  const result = await response.json();
  return returnData(result);
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
