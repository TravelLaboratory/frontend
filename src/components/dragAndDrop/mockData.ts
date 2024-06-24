import { PlanDetail, ScheduleList } from '@/libs/types/dragAndDropType';

// 여행 계획 정보 mock 데이터
export const mockPlanDetail: PlanDetail = {
  title: '제주도 여행',
  location: [
    {
      place_id: '1',
      address: '제주특별자치도 제주시 애월읍',
      city: '제주'
    },
    {
      place_id: '2',
      address: '서울특별시 강남구',
      city: '서울'
    }
  ],
  start_at: '2024-05-25',
  end_at: '2024-05-29',
  expense: '0',
  travel_companion: '친구',
  travel_style: ['자연', '맛집'],
  name: '여행 계획 1',
  bookmark_count: 10,
  is_bookmarked: true,
  is_private: false
};

// 일정 블록 리스트 mock 데이터
export const mockScheduleList: ScheduleList = {
  review_id: 111,
  is_editable: false,
  schedules: [
    {
      schedule_id: 1,
      visited_date: '2024-05-25',
      visited_time: '09:00',
      duration_time: '02:00',
      expense: '15,000 KRW',
      memo: '에메랄드빛 바다',
      sort_order: 2,
      category: '관광지',
      dtype: 'GENERAL',
      schedule_general: {
        place_name: '함덕해수욕장',
        google_map_place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
        google_map_latitude: 33.55635,
        google_map_longitude: 126.795841,
        google_map_address: '제주특별자치도 제주시 조천읍 함덕리',
        google_map_phone_number: '064-123-4567',
        google_map_home_page_url: 'http://www.haeundae.go.kr'
      },
      schedule_transport: null,
      schedule_etc: null
    },
    {
      schedule_id: 2,
      visited_date: '2024-05-25',
      visited_time: '13:00',
      duration_time: '01:30',
      expense: '7,000 KRW',
      memo: '맛집',
      sort_order: 3,
      category: '식당',
      dtype: 'GENERAL',
      schedule_general: {
        place_name: '돔베돈',
        google_map_place_id: 'ChIJlyYmIFfjDDURGbscwa5LbXE',
        google_map_latitude: 33.5155556,
        google_map_longitude: 126.5266667,
        google_map_address: '제주특별자치도 제주시 연동',
        google_map_phone_number: '064-765-4321',
        google_map_home_page_url: 'http://www.dombedon.co.kr'
      },
      schedule_transport: null,
      schedule_etc: null
    },
    {
      schedule_id: 3,
      visited_date: '2024-05-25',
      visited_time: '10:00',
      duration_time: '00:45',
      expense: '1,500 KRW',
      memo: '버스 타기',
      sort_order: 1,
      category: '교통',
      dtype: 'TRANSPORT',
      schedule_general: null,
      schedule_transport: {
        transportation: '대중교통',
        start_place_name: '제주 시외버스터미널',
        google_map_start_place_address: '제주특별자치도 제주시 연동',
        google_map_start_latitude: 33.511293,
        google_map_start_longitude: 126.527603,
        end_place_name: '서귀포 시외버스터미널',
        google_map_end_place_address: '제주특별자치도 서귀포시 중앙로',
        google_map_end_latitude: 33.253225,
        google_map_end_longitude: 126.561618
      },
      schedule_etc: null
    },
    {
      schedule_id: 4,
      visited_date: '2024-05-28',
      visited_time: '14:00',
      duration_time: '00:30',
      expense: '0 KRW',
      memo: '기념품 샵 구경',
      sort_order: 1,
      category: '기타',
      dtype: 'ETC',
      schedule_general: null,
      schedule_transport: null,
      schedule_etc: {
        place_name: '제주 기념품 샵'
      }
    }
  ]
};
