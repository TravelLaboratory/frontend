'use client';

import { useQuery } from '@tanstack/react-query';

import profileService from './fetchService';
import { UserProfile } from './type';

// 클라이언트 사이드 react-query 훅
export default function useGetProfile() {
  return useQuery<UserProfile>({
    queryKey: ['useGetProfile'],
    queryFn: profileService.getProfile
  });
}
