import { Libraries } from '@react-google-maps/api';

import { Coordinate } from '@/components/map/type';
import { Transport } from '@/libs/types/commonPlanType.js';

// 구글맵 API
export const GOOGLE_MAPS = {
  API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || ''
};

// 맵 최대 줌 레벨
export const MAX_ZOOM = 18;

// 맵 초기 위치
export const DEFAULT_COORDINATE_LIST: Coordinate[] = [
  { lat: 35.68123620000001, lng: 139.7671248 } // 도쿄
];

// 라이브러리 목록
export const LIBRARIES: Libraries = ['places', 'marker'];

// Directions API 이동 수단 목록
export const TRANSPORT_LIST: Transport[] = ['자동차', '도보', '자전거', '대중교통'];

// places.types[0] 한국어로 번역
export const PLACE_TYPES: { [key: string]: string } = {
  accounting: '회계',
  airport: '공항',
  amusement_park: '놀이공원',
  aquarium: '수족관',
  art_gallery: '미술관',
  atm: 'ATM',
  bakery: '베이커리',
  bank: '은행',
  bar: '바',
  beauty_salon: '미용실',
  bicycle_store: '자전거 가게',
  book_store: '서점',
  bowling_alley: '볼링장',
  bus_station: '버스 정류장',
  cafe: '카페',
  campground: '캠핑장',
  car_dealer: '자동차 딜러',
  car_rental: '렌터카',
  car_repair: '자동차 수리',
  car_wash: '세차장',
  casino: '카지노',
  cemetery: '묘지',
  church: '교회',
  city_hall: '시청',
  clothing_store: '의류 매장',
  convenience_store: '편의점',
  courthouse: '법원',
  dentist: '치과',
  department_store: '백화점',
  doctor: '의사',
  drugstore: '약국',
  electrician: '전기공',
  electronics_store: '전자 제품 매장',
  embassy: '대사관',
  fire_station: '소방서',
  florist: '꽃집',
  funeral_home: '장례식장',
  furniture_store: '가구 매장',
  gas_station: '주유소',
  gym: '체육관',
  hair_care: '미용 관리',
  hardware_store: '철물점',
  hindu_temple: '힌두 사원',
  home_goods_store: '가정용품 매장',
  hospital: '병원',
  insurance_agency: '보험 대리점',
  jewelry_store: '보석 상점',
  laundry: '세탁소',
  lawyer: '변호사',
  library: '도서관',
  light_rail_station: '경전철 역',
  liquor_store: '주류 판매점',
  local_government_office: '지방 정부 사무소',
  locksmith: '자물쇠 수리공',
  lodging: '숙박 시설',
  meal_delivery: '음식 배달',
  meal_takeaway: '테이크아웃',
  mosque: '모스크',
  movie_rental: '비디오 대여',
  movie_theater: '영화관',
  moving_company: '이사업체',
  museum: '박물관',
  night_club: '나이트클럽',
  painter: '화가',
  park: '공원',
  parking: '주차장',
  pet_store: '애완동물 가게',
  pharmacy: '약국',
  physiotherapist: '물리치료사',
  plumber: '배관공',
  police: '경찰서',
  post_office: '우체국',
  primary_school: '초등학교',
  real_estate_agency: '부동산 중개소',
  restaurant: '레스토랑',
  roofing_contractor: '지붕 공사업자',
  rv_park: 'RV 공원',
  school: '학교',
  secondary_school: '중고등학교',
  shoe_store: '신발 매장',
  shopping_mall: '쇼핑몰',
  spa: '스파',
  stadium: '경기장',
  storage: '창고',
  store: '가게',
  subway_station: '지하철 역',
  supermarket: '슈퍼마켓',
  synagogue: '유대교 회당',
  taxi_stand: '택시 승강장',
  tourist_attraction: '관광 명소',
  train_station: '기차역',
  transit_station: '환승역',
  travel_agency: '여행사',
  university: '대학교',
  veterinary_care: '수의사',
  zoo: '동물원',
  unknown: '기타'
};
