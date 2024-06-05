/* eslint-disable max-len */

'use client';

import React from 'react';

import { DefaultCardProps } from '@/components/card/type';
import ImageBox from '@/components/common/ImageBox';
import useMediaQuery from '@/libs/hooks/useMediaQuery';
import useResizeHeight from '@/libs/hooks/useResizeHeight';

interface TravelCardProps extends DefaultCardProps {
  route: string[];
  tag: string[];
  period: { start: string; end: string };
  user: { name: string; profileImg: string };
  favorite: number;
  comment: number;
}

export default function TravelCard({
  imageUrl,
  title,
  route,
  period,
  tag,
  user,
  favorite,
  comment,
  onClick
}: TravelCardProps) {
  const { divRef, divHeight } = useResizeHeight();
  const isMd = useMediaQuery('(min-width: 768px)');

  const buttonStyle = isMd ? { maxHeight: `${divHeight}px` } : undefined;

  return (
    <>
      {/* css에서 동적인 수치는 반영되지 않으므로 style에 직접 주입 */}
      <button
        className="md:flex-row-center relative flex size-full overflow-hidden border border-solid max-md:flex-col"
        style={buttonStyle}
        type="button"
        onClick={onClick}
      >
        {/* 대표 이미지 */}
        <ImageBox
          className="w-full max-md:max-h-52 md:w-auto md:max-w-64"
          src={imageUrl}
          alt={imageUrl}
          width={80}
          height={80}
        />
        {/* 콘텐츠 */}
        <div className="flex-grow max-md:w-full" ref={divRef}>
          {/* 상단 각종 데이터 */}
          <div className="flex flex-col gap-2 border-b p-4">
            <p>{title}</p>
            <div>
              {route.map((item, idx) => (
                <span key={item}>
                  <span>{item}</span>
                  {idx < route.length - 1 && <span> → </span>}
                </span>
              ))}
              <p>
                {period.start} ~ {period.end}
              </p>
            </div>
            <div className="flex-row-center flex-wrap gap-2">
              {tag.map((item) => (
                <p key={item} className="flex-shrink-0 bg-slate-300">
                  #{item}
                </p>
              ))}
            </div>
          </div>
          {/* 하단 프로필, 카운트 */}
          <div className="flex-row-center justify-between p-3">
            <div className="flex-row-center gap-2">
              <ImageBox
                className="size-full max-h-8 max-w-8 rounded-full"
                src={user.profileImg}
                alt={user.profileImg}
                width={8}
                height={8}
              />
              <p>{user.name}</p>
            </div>
            <div className="flex-row-center gap-2">
              <div>❤️{favorite}</div>
              <div>🌈{comment}</div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
