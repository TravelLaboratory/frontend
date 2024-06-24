/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';

import dynamic from 'next/dynamic';

import { Coordinate } from '@/components/map/type';
import { MODAL_MAP_STYLE } from '@/libs/constants/mapStyle';
import useCoordinateList from '@/libs/hooks/useCoordinateList';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';
import { TransportBlockDetailData } from '@/libs/types/modalType';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });

interface BlockDetailModalContentTransportProps extends GoogleMapsApiReturn {
  blockData: TransportBlockDetailData;
}

export default function BlockDetailModalContentTransport({
  blockData,
  isLoaded
}: BlockDetailModalContentTransportProps) {
  const { name, address, lat, lng, secondPlaceName, secondPlaceAddress, secondPlaceLat, secondPlaceLng } = blockData;
  const { coordinateList, setCoordinateList } = useCoordinateList();

  useEffect(() => {
    const newCoordinateList: Coordinate[] = [
      { lat, lng },
      { lat: secondPlaceLat, lng: secondPlaceLng }
    ];
    setCoordinateList(newCoordinateList);
  }, [lat, lng, secondPlaceLat, secondPlaceLng]);

  if (!isLoaded) return <div className={`bg-gray-02 ${MODAL_MAP_STYLE}`} />;
  return (
    <>
      <div className="mb-3 md:mb-4">
        <Map
          mapContainerStyle={MODAL_MAP_STYLE}
          coordinateList={coordinateList}
          markerCategoryList={[blockData.category, blockData.category]}
        />
      </div>
      <div className="mb-2 rounded-[0.3125rem] bg-gray-03 px-5 py-4">
        <p className="font-subtitle-2 mb-3">
          출발지<span className="font-caption-1 ml-3 text-black-03">{name}</span>
        </p>
        <p className="font-subtitle-2">
          주소<span className="font-caption-1 ml-3 break-words text-black-03">{address}</span>
        </p>
      </div>
      <div className="rounded-[0.3125rem] bg-gray-03 px-5 py-4">
        <p className="font-subtitle-2 mb-3">
          도착지<span className="font-caption-1 ml-3 text-black-03">{secondPlaceName}</span>
        </p>
        <p className="font-subtitle-2">
          주소<span className="font-caption-1 ml-3 break-words text-black-03">{secondPlaceAddress}</span>
        </p>
      </div>
    </>
  );
}
