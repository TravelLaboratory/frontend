/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import { useState } from 'react';

import ImageBox from '@/components/common/ImageBox';
import DropdownInput from '@/components/common/input/DropdownInput';
import SearchInput from '@/components/common/input/SearchInput';
import EmptyResultMessage from '@/components/map/EmptyResultMessage';
import PlaceSearchResult from '@/components/map/PlaceSearchResult';
import { TRANSPORT_LIST } from '@/libs/constants/googleMaps';
import useGoogleMapsPlaceSearch from '@/libs/hooks/useGoogleMapsPlaceSearch';
import { Transport } from '@/libs/types/commonPlanType.js';

interface PlaceSearchTransportProps {
  className?: string;
  onTransportSelect: (
    transport: Transport,
    place: google.maps.places.PlaceResult,
    secondPlace: google.maps.places.PlaceResult
  ) => void;
}

export default function PlaceSearchTransport({ className, onTransportSelect }: PlaceSearchTransportProps) {
  const { query, setQuery, places, error, loading } = useGoogleMapsPlaceSearch();
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<Transport>(TRANSPORT_LIST[0]);

  const handleDropdownSelect = (e?: any) => {
    if (e?.target?.textContent) {
      setSelectedTransport(
        TRANSPORT_LIST.find((transport: Transport) => transport === e?.target?.textContent) || TRANSPORT_LIST[0]
      );
    }
    setQuery('');
  };

  const handleFirstPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place) setSelectedPlace(place);
    setQuery('');
  };

  const handleSecondPlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (selectedPlace && place) onTransportSelect(selectedTransport, selectedPlace, place);
  };

  const searchInputLabel = selectedPlace ? '도착지' : '출발지';

  return (
    <div className={className}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-10">
          <p className="modal-h2 mb-3">교통수단</p>
          <DropdownInput
            id="transport"
            value={selectedTransport}
            dropdownList={TRANSPORT_LIST}
            onClickInside={handleDropdownSelect}
          />
        </div>
        <p className="modal-h2 mb-3">장소 검색</p>
        <p className="font-subtitle-3 mb-2 text-gray-01">출발지</p>
        {!selectedPlace && (
          <SearchInput
            className="mb-4 px-4 py-3"
            onClickSearchIcon={(searchString: string) => {
              setQuery(searchString);
            }}
            onClickRemoveIcon={() => setQuery('')}
            placeholder={`${searchInputLabel}를 입력해주세요.`}
          />
        )}
        {selectedPlace && (
          <>
            <div className="flex-row-center pb-4">
              <ImageBox
                className="size-14 rounded-md"
                placeholderClassName="size-[5.4375rem] min-w-[5.4375rem] rounded-md bg-gray-02"
                src={selectedPlace?.photos?.[0].getUrl({ maxWidth: 200, maxHeight: 200 }) || ''}
                alt={selectedPlace.name || 'Place Photo'}
                width={56}
                height={56}
              />
              <div className="ml-3">
                <p className="font-subtitle-2 mb-1 line-clamp-1">{selectedPlace.name}</p>
                <p className="font-caption-2 line-clamp-1 text-gray-01">{selectedPlace.formatted_address}</p>
              </div>
            </div>
            <p className="font-subtitle-3 mb-2 text-gray-01">도착지</p>
            <SearchInput
              className="mb-4 px-4 py-3"
              onClickSearchIcon={(searchString: string) => {
                setQuery(searchString);
              }}
              onClickRemoveIcon={() => setQuery('')}
              placeholder={`${searchInputLabel}를 입력해주세요.`}
            />
          </>
        )}

        {error && !loading && <EmptyResultMessage>{error}</EmptyResultMessage>}
        {/* 장소 정보 */}
        <PlaceSearchResult
          query={query}
          places={places}
          onPlaceSelect={!selectedPlace ? handleFirstPlaceSelect : handleSecondPlaceSelect}
          loading={loading}
        />
      </form>
    </div>
  );
}
