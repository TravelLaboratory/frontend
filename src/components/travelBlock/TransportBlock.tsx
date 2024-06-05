import React from 'react';

import ImageBox from '@/components/common/ImageBox';
import CoreBlock, { DefaultBlockProps } from '@/components/travelBlock/CoreBlock';

/**
 * 교통 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param route \{ start: string; end: string }; 출발지 및 도착지 객체
 * @param memo string; (optional) 메모
 */
export interface TransportBlockProps extends DefaultBlockProps {
  route: { start: string; end: string };
  memo?: string;
}

/**
 * 교통 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param route \{ start: string; end: string }; 출발지 및 도착지 객체
 * @param memo string; (optional) 메모
 */
export default function TransportBlock({ name, tag, route, memo, onClick }: TransportBlockProps) {
  const imageUrl: { [key: string]: string } = {
    walk: 'https://picsum.photos/360/360',
    subway: 'https://picsum.photos/360/360'
  };

  return (
    <CoreBlock name={name} tag={tag} route={route} memo={memo} onClick={onClick}>
      {/* 이미지 크기 조절하기 */}
      {imageUrl && (
        <ImageBox className="h-full max-w-36" src={imageUrl[tag]} alt={imageUrl[tag]} width={36} height={36} />
      )}
    </CoreBlock>
  );
}
