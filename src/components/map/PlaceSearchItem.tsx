/* eslint-disable no-undef */

'use client';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/button/Button';
import ImageBox from '@/components/common/ImageBox';
import ChevronSvg from '@/icons/chevron-custom.svg';
import translatePlaceType from '@/libs/utils/translatePlaceType';

interface PlaceSearchItemProps {
  place: google.maps.places.PlaceResult;
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void;
}

export default function PlaceSearchItem({ place, onPlaceSelect = () => {} }: PlaceSearchItemProps) {
  if (!place) return null;
  return (
    <Button
      key={place.place_id}
      className="flex-row-center w-full justify-between py-2 hover:bg-primary-02"
      onClick={() => onPlaceSelect(place)}
    >
      <div className="flex-row-center">
        {/* 장소 이미지 */}
        <ImageBox
          className="size-[5.4375rem] min-w-[5.4375rem] rounded-md"
          placeholderClassName="size-[5.4375rem] min-w-[5.4375rem] rounded-md bg-gray-02"
          src={place?.photos?.[0].getUrl({ maxWidth: 87 * 4, maxHeight: 87 * 4 }) || ''}
          alt={place.name || 'Place Photo'}
          width={87}
          height={87}
        />
        {/* 장소 타입, 이름, 주소 */}
        <div className="ml-3">
          {/* Badge 컴포넌트로 변경 */}
          <Badge type="태그" className="mb-[0.375rem]">
            {translatePlaceType(place.types?.[0])}
          </Badge>
          <p className="font-subtitle-2 mb-1 line-clamp-1">{place.name}</p>
          <p className="font-caption-2 line-clamp-1 text-gray-01">{place.formatted_address}</p>
        </div>
      </div>
      {/* 장소 선택 텍스트 */}
      <div className="flex-row-center mx-4">
        <p className="ml-3 mr-1 whitespace-nowrap">선택</p>
        <ChevronSvg width={16} height={16} fill="bg-gray-01" />
      </div>
    </Button>
  );
}
