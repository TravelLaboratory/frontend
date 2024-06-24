/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

// 서버 사이드에서만 next/headers를 import
const getServerAuthToken = () => {
  if (typeof window === 'undefined') {
    const { cookies } = require('next/headers');
    const cookieStore = cookies();
    return cookieStore.get('authorization-token')?.value || '';
  }
  return '';
};

// 클라이언트 사이드에서만 js-cookie를 import
const getClientAuthToken = () => {
  if (typeof window !== 'undefined') {
    const Cookies = require('js-cookie');
    return Cookies.get('authorization-token') || '';
  }
  return '';
};

// 환경에 따라 적절한 함수 호출
const getAuthToken = (): string => {
  return typeof window === 'undefined' ? getServerAuthToken() : getClientAuthToken();
};

export default getAuthToken;
