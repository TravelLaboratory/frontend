import { Category } from '@/libs/types/commonPlanType';
import { CommonBlockDetailData } from '@/libs/types/modalType';

export const DEFAULT_CATEGORY = '숙소';
export const CATEGORY_LIST: Category[] = ['숙소', '식당', '관광지', '액티비티', '교통', '기타'];
export const CATEGORY: { [key: string]: string } = {
  숙소: '숙소',
  식당: '식당',
  관광지: '관광지',
  액티비티: '액티비티',
  교통: '교통',
  기타: '기타'
};

export const DEFAULT_BLOCK_DATA: CommonBlockDetailData = {
  category: DEFAULT_CATEGORY,
  name: '',
  startAt: '0000',
  duration: '0000',
  budget: '0 KRW',
  memo: ''
};

export type DropdownAmPm = '오전' | '오후';
export const DROPDOWN_AMPM: DropdownAmPm[] = ['오전', '오후'];

export type DropdownHour = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export const DROPDOWN_HOUR: DropdownHour[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export type DropdownMinute = '00' | '05' | '10' | '15' | '20' | '25' | '30' | '35' | '40' | '45' | '50' | '55';
export const DROPDOWN_MINUTE: DropdownMinute[] = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
];
