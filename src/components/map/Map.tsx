/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */

'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';

import { Coordinate } from '@/components/map/type';
import { DEFAULT_COORDINATE_LIST, GOOGLE_MAPS, MAX_ZOOM } from '@/libs/constants/googleMaps';
import { MARKER_COLOR } from '@/libs/constants/mapStyle';
import { Category } from '@/libs/types/commonPlanType';

interface MapProps extends GoogleMapProps {
  mapContainerStyle: React.CSSProperties;
  coordinateList?: (Coordinate | undefined)[];
  markerCategoryList?: (Category | undefined)[];
  alwaysRender?: boolean;
}

export default function Map({
  mapContainerStyle,
  coordinateList = [],
  markerCategoryList = [],
  alwaysRender = false
}: MapProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

  const center = coordinateList?.[0] || DEFAULT_COORDINATE_LIST[0];

  // 맵 load
  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      setMap(map);
    },
    [map, coordinateList]
  );

  // 맵 unmount
  const handleOnUnmount = useCallback(() => {
    markers.forEach((marker) => {
      if (marker.map) {
        marker.map = null;
      }
    });
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }
    setMap(null);
  }, [markers, polyline]);

  // 커스텀 마커 스타일
  const createMarkerElement = (number: number) => {
    const markerDiv = document.createElement('div');
    markerDiv.style.backgroundColor = MARKER_COLOR[markerCategoryList?.[number - 1] || '교통'].bg;
    markerDiv.style.width = '2rem';
    markerDiv.style.height = '2rem';
    markerDiv.style.borderRadius = '50%';
    markerDiv.style.color = MARKER_COLOR[markerCategoryList?.[number - 1] || '교통'].text;
    markerDiv.style.font = 'Pretendard';
    markerDiv.style.fontWeight = '700';
    markerDiv.style.display = 'flex';
    markerDiv.style.alignItems = 'center';
    markerDiv.style.justifyContent = 'center';
    markerDiv.style.fontSize = '1rem';
    markerDiv.textContent = number.toString();
    markerDiv.style.transform = 'translateY(50%)';
    return markerDiv;
  };

  useEffect(() => {
    if (!map) return;

    const bounds = new window.google.maps.LatLngBounds();

    // 기존 마커 초기화
    markers.forEach((marker) => {
      if (marker.map) {
        marker.map = null;
      }
    });
    setMarkers([]);

    // 새로운 마커 추가
    const newMarkers = coordinateList.map((coord, index) => {
      if (!coord) return;
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: coord,
        map,
        content: createMarkerElement(index + 1)
      });
      bounds.extend(new window.google.maps.LatLng(coord.lat, coord.lng));
      return marker;
    });
    const finalMarkers = newMarkers.filter(
      (marker) => marker !== undefined
    ) as google.maps.marker.AdvancedMarkerElement[];
    setMarkers(finalMarkers);

    // 기존 폴리라인 초기화
    if (polyline && polyline.getMap()) {
      polyline.setMap(null);
    }

    // 새로운 폴리라인 추가
    const pathList = coordinateList.filter((coord) => coord !== undefined) as Coordinate[];
    const newPolyline = new google.maps.Polyline({
      path: pathList,
      map,
      strokeColor: '#4F80FF',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    setPolyline(newPolyline);

    // 마커 거리에 맞춰 줌 레벨 제어
    map.fitBounds(bounds);

    // idle 이벤트 리스너를 추가하여 맵 최대 줌 레벨 제어
    const listener = window.google.maps.event.addListenerOnce(map, 'idle', () => {
      const currentZoom = map.getZoom() || 0;
      if (currentZoom > MAX_ZOOM) {
        map.setZoom(MAX_ZOOM);
      }

      const hasCoord = coordinateList.some((coord) => coord !== undefined);

      if (!hasCoord) {
        map.setZoom(MAX_ZOOM);
        map.setCenter(DEFAULT_COORDINATE_LIST[0]);
      }
    });

    return () => window.google.maps.event.removeListener(listener);
  }, [map, coordinateList, markerCategoryList]);

  if (!coordinateList && !alwaysRender) return null;
  if (coordinateList.length === 0 && !alwaysRender) return null;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={MAX_ZOOM}
      onLoad={handleOnLoad}
      onUnmount={handleOnUnmount}
      options={{
        mapId: GOOGLE_MAPS.MAP_ID,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false
      }}
    />
  );
}
