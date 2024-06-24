/* eslint-disable no-undef */

import { Category, Transport } from '@/libs/types/commonPlanType.js';

// 장소 선택 함수 타입
export type OnPlaceSelectProps = {
  category: Category;
  place: google.maps.places.PlaceResult;
};
export type OnPlaceSelect<T = any> = ({ category, place }: OnPlaceSelectProps & T) => void;

export type OnTransportSelectProps = {
  category: Category;
  transport: Transport;
  place: google.maps.places.PlaceResult;
  secondPlace: google.maps.places.PlaceResult;
};
export type OnTransportSelect<T = any> = ({
  category,
  transport,
  place,
  secondPlace
}: OnTransportSelectProps & T) => void;

export type OnEtcSelectProps = { category: Category; name: string };
export type OnEtcSelect<T = any> = ({ category, name }: OnEtcSelectProps & T) => void;

// 블록 데이터 타입
export type DefaultCreatedBlockData = {
  category: Category;
  place: null;
};

export type CreatedBlockData = OnPlaceSelectProps;
export type CreateTransportBlockData = OnTransportSelectProps;
export type CreateEtcBlockData = OnEtcSelectProps;

// 일정 상세 - 공통
export type CommonBlockDetailData = {
  category: Category;
  name: string;
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};

// 일정 상세 - 숙소, 식당, 관광지, 액티비티
// placeId -> location, address, phone, homepage, photos[0,1,2]
export type PlaceBlockDetailData = CommonBlockDetailData & {
  placeId: string;
  lat: number;
  lng: number;
  address: string;
  phone?: string;
  homepage?: string;
};

// 일정 상세 - 교통
export type TransportBlockDetailData = CommonBlockDetailData & {
  transport: Transport;
  address: string;
  lat: number;
  lng: number;
  secondPlaceName: string;
  secondPlaceAddress: string;
  secondPlaceLat: number;
  secondPlaceLng: number;
};

// 일정 상세 - 기타
export type EtcBlockDetailData = CommonBlockDetailData;

// 일정 상세 편집 타입
export type OnBlockDetailEditProps = {
  startAt: string;
  duration: string;
  budget: string;
  memo?: string;
};
export type OnBlockDetailEdit<T = any> = ({ startAt, duration, budget, memo }: OnBlockDetailEditProps & T) => void;

// 비용 상세 편집 타입
export type OnBudgetDetailEditProps = {
  budget: string;
};
export type OnBudgetDetailEdit<T = any> = ({ budget }: OnBudgetDetailEditProps & T) => void;
