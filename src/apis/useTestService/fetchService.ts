import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import interceptor from '@/apis/interceptors/interceptor';
import { returnData } from '@/apis/utils/utils';

const options: ReturnFetchDefaultOptions = {
  baseUrl: 'https://be.travel-laboratory.site',
  headers: {
    'Content-Type': 'application/json',
    'authorization-token':
      'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsImV4cCI6MTcxODYzODc3NH0.2U-IcGdoaDLrkfujzkNjl7VBC3HXOQKYmgxeBw-4OEE'
  },
  interceptors: {
    request: async (args: any) => {
      console.log('********* before sending request *********');
      console.log('url:', args[0].toString());
      console.log('requestInit:', args[1], '\n\n');
      return args;
    },
    response: async (response: any, requestArgs: any) => {
      console.log('********* after receiving response *********');
      console.log('url:', requestArgs[0].toString());
      console.log('requestInit:', requestArgs[1], '\n\n');
      return response;
    }
  } as { [key: string]: any }
};

const fetchService = returnFetch({ fetch: interceptor.logging(options) });

const profileService = {
  getProfile: async () => {
    const response = await fetchService(`/api/v1/users/profile`, { method: 'GET' });
    const result = await response.json();
    return returnData(result);
  }
};

export default profileService;
