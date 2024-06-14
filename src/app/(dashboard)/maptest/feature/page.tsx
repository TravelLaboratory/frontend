'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

import React, { useEffect, useState } from 'react';

import { useJsApiLoader, Libraries } from '@react-google-maps/api';
import dynamic from 'next/dynamic';

import { Coordinate } from '@/components/map/type';
import { DEFAULT_COORDINATE_LIST, GOOGLE_MAPS } from '@/libs/constants/googleMaps';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
const PlaceSearch = dynamic(() => import('@/components/map/PlaceSearch'), { ssr: false });
const PlaceDetails = dynamic(() => import('@/components/map/PlaceDetail'), { ssr: false });

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const LIBRARIES: Libraries = ['places', 'marker'];

function Page() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS.API_KEY,
    libraries: LIBRARIES
  });

  const [firstPlace, setFirstPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [secondPlace, setSecondPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [coordinateList, setCoordinateList] = useState<Coordinate[]>(DEFAULT_COORDINATE_LIST);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult, isFirst: boolean) => {
    if (isFirst) {
      setFirstPlace(place);
      setSecondPlace(null);
      setCoordinateList([{ lat: place.geometry!.location!.lat(), lng: place.geometry!.location!.lng() }]);
    } else {
      setSecondPlace(place);
      setCoordinateList([
        { lat: firstPlace!.geometry!.location!.lat(), lng: firstPlace!.geometry!.location!.lng() },
        { lat: place.geometry!.location!.lat(), lng: place.geometry!.location!.lng() }
      ]);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinateList([{ lat: latitude, lng: longitude }]);
        },
        (error) => {
          console.error('Error fetching user location', error);
          // 기본 좌표 설정
          setCoordinateList(DEFAULT_COORDINATE_LIST);
        }
      );
    } else {
      // Geolocation을 지원하지 않는 경우 기본 좌표 설정
      setCoordinateList(DEFAULT_COORDINATE_LIST);
    }
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Google Map Example</h1>
      <div>
        <h2>Search First Place</h2>
        <PlaceSearch onPlaceSelect={(place) => handlePlaceSelect(place, true)} />
      </div>
      {firstPlace && (
        <>
          <h2>First Place Details</h2>
          <PlaceDetails placeId={firstPlace.place_id!} />
        </>
      )}
      {firstPlace && (
        <div>
          <h2>Search Second Place</h2>
          <PlaceSearch onPlaceSelect={(place) => handlePlaceSelect(place, false)} />
        </div>
      )}
      {secondPlace && (
        <>
          <h2>Second Place Details</h2>
          <PlaceDetails placeId={secondPlace.place_id!} />
        </>
      )}
      <Map mapContainerStyle={mapContainerStyle} coordinateList={coordinateList} />
    </div>
  );
}

export default Page;