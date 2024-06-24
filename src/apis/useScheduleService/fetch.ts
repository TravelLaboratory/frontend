import { redirect } from 'next/navigation';
import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import API_URL from '@/apis/constants/url';
import getAuthToken from '@/apis/utils/getAuthToken';
import { returnData } from '@/apis/utils/utils';
import { Schedule } from '@/libs/types/dragAndDropType';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  schedules: {
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
  },
  coverImage: {
    baseUrl: API_URL.API_BASE_URL,
    headers: {},
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

const fetchSchedule = returnFetch(options.schedules);
const fetchCoverImage = returnFetch(options.coverImage);

// 서버 사이드 fetch
const serviceSchedule = {
  getSchedules: async (articleId: number) => {
    const authToken = getAuthToken();
    const response = await fetchSchedule(`api/v1/articles/${articleId}/schedules`, {
      method: 'GET',
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  },
  putSchedules: async (articleId: number, payload: { schedules: Schedule[] }) => {
    const authToken = getAuthToken();
    const response = await fetchSchedule(`api/v1/articles/${articleId}/schedules`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'authorization-token': authToken
      }
    });
    const result = response.json();
    return returnData(result);
  },
  deleteSchedules: async (articleId: number) => {
    const authToken = getAuthToken();
    const response = await fetchSchedule(`api/v1/articles/${articleId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_delete: true }),
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  },
  patchSchedulesPrivacy: async (articleId: number, payload: { is_private: boolean }) => {
    const authToken = getAuthToken();
    const response = await fetchSchedule(`api/v1/articles/${articleId}/privacy`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  },
  putSchedulesCoverImage: async (articleId: number, payload: { coverImage: File | null }) => {
    const authToken = getAuthToken();
    const formData = new FormData();
    if (payload.coverImage) {
      formData.append('coverImage', payload.coverImage);
    }

    const response = await fetchCoverImage(`api/v1/article/${articleId}/coverImage`, {
      method: 'PUT',
      body: formData,
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  },
  getSchedulesPlanDetail: async (articleId: number) => {
    const authToken = getAuthToken();
    const response = await fetchSchedule(`api/v1/article/${articleId}`, {
      method: 'GET',
      headers: {
        'authorization-token': authToken
      }
    });
    return returnData(response);
  }
};

export default serviceSchedule;
