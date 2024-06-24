import returnFetch, { ReturnFetch } from 'return-fetch';

const interceptor: { [key: string]: ReturnFetch } = {
  logging: (args) =>
    returnFetch({
      ...args,
      interceptors: {
        request: async (request) => {
          console.log('▷▷▷ Request', request);
          return request;
        },
        response: async (response) => {
          console.log('▶▶▶ Response', response);
          return response;
        }
      }
    }),
  returnJson: (args) =>
    returnFetch({
      ...args,
      interceptors: {
        response: async (response) => {
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || 'Error');
          }
          return result;
        }
      }
    })
};

export default interceptor;
