/*eslint-disable*/

import returnFetch, { ReturnFetchDefaultOptions } from 'return-fetch';

import { signupProps } from '@/components/SignupForm';

const options: { [key: string]: ReturnFetchDefaultOptions } = {
  signup: {
    //baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    baseUrl: 'https://be.travel-laboratory.site',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  checkUsername: {
    baseUrl: 'https://be.travel-laboratory.site',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  checkNickname: {
    baseUrl: 'https://be.travel-laboratory.site',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

const fetchSignup = returnFetch(options.signup);
const fetchCheckUsername = returnFetch(options.checkUsername);
const fetchCheckNickname = returnFetch(options.checkNickname);

const serviceSignup = {
  postSignup: async (data: signupProps) => {
    const response = await fetchSignup('/api/v1/auth/join', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  },
  postUsernameCheck: async (data: string) => {
    const response = await fetchCheckUsername('/api/v1/auth/username', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  },
  postNicknameCheck: async (data: string) => {
    const response = await fetchCheckNickname('/api/v1/auth/nickname', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = response.json();
    return result;
  }
};

export default serviceSignup;