'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import serviceSchedule from '@/apis/useScheduleService/fetch';
import { PlanDetail, Schedule, ScheduleList } from '@/libs/types/dragAndDropType';

// 클라이언트 사이드 react-query 훅
export function useGetSchedules(articleId: number) {
  return useQuery<ScheduleList>({
    queryKey: ['useGetSchedules', articleId] as const,
    queryFn: () => serviceSchedule.getSchedules(articleId)
  });
}

export function usePutSchedules(articleId: number, payload: { schedules: Schedule[] }) {
  return useMutation<{ schedules: Schedule[] }>({
    mutationKey: ['usePutSchedules', articleId] as const,
    mutationFn: () => serviceSchedule.putSchedules(articleId, payload)
  });
}

export function useDeleteSchedules(articleId: number) {
  return useMutation<{ is_delete: boolean }>({
    mutationKey: ['useDeleteSchedules', articleId] as const,
    mutationFn: () => serviceSchedule.deleteSchedules(articleId)
  });
}

export function usePatchSchedulesPrivacy(articleId: number, payload: { is_private: boolean }) {
  return useMutation<{ is_private: boolean }>({
    mutationKey: ['usePatchSchedulesPrivacy', articleId] as const,
    mutationFn: () => serviceSchedule.patchSchedulesPrivacy(articleId, payload)
  });
}

export function usePutSchedulesCoverImage(articleId: number, payload: { coverImage: File | null }) {
  return useMutation<{ cover_image_url: string }>({
    mutationKey: ['usePutSchedulesCoverImage', articleId] as const,
    mutationFn: () => serviceSchedule.putSchedulesCoverImage(articleId, payload)
  });
}

export function useGetSchedulesPlanDetail(articleId: number) {
  return useQuery<PlanDetail>({
    queryKey: ['useGetSchedulesPlanDetail', articleId] as const,
    queryFn: () => serviceSchedule.getSchedulesPlanDetail(articleId)
  });
}
