import { Category } from '@/libs/types/commonPlanType';

// 지도 스타일
export const MODAL_MAP_STYLE = {
  width: '100%',
  height: '15rem',
  borderRadius: '0.3125rem'
};

export const PAGE_MAP_STYLE_MOBILE = {
  width: '100vw',
  height: 'calc(90vh - 17.8125rem)'
};

export const PAGE_MAP_STYLE = {
  width: 'calc(90vw)',
  height: 'calc(100vh - 4.5rem)'
};

export const MARKER_COLOR: { [key in Category]: { bg: string; text: string } } = {
  숙소: {
    bg: '#FB2F85',
    text: '#FFEFF4'
  },
  식당: {
    bg: '#F35802',
    text: '#FFF0EA'
  },
  관광지: {
    bg: '#9C27B0',
    text: '#F4ECFF'
  },
  액티비티: {
    bg: '#55B135',
    text: '#F1FBED'
  },
  교통: {
    bg: '#4F80FF',
    text: '#DEEBFF'
  },
  기타: {
    bg: '#F5BA07',
    text: '#FFF6DC'
  }
};
