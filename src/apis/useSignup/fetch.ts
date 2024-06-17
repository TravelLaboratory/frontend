import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import { signupProps } from '@/components/SignupForm';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  signup: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
  }
};

const fetchSignup = returnFetch(options.signup);

const serviceSignup = {
  postSignup: async (data: signupProps) => {
    const response = await fetchSignup('api/v1/auth/join', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  },
  postEmailCheck: async (data: string) => {
    const response = await fetchSignup('api/v1/auth/아직 없음', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  },
  postNicknameCheck: async (data: string) => {
    const response = await fetchSignup('api/v1/auth/nickname', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  }
};

export default serviceSignup;
