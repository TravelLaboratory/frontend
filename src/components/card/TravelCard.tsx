/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import ImageBox from '@/components/common/ImageBox';

export interface TravelCardProps {
  id: string;
  title: string;
  city: string[];
  startAt: string;
  endAt: string;
  travelCompanion: string;
  travelStyle: string[];
  name: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  price: number;
  bookmarkCount: number;
  isBookmarked: boolean;
  isEditable?: boolean;
  isPlanTab?: boolean;
  onClick: () => void;
}

export default function TravelCard({
  title,
  city,
  startAt,
  endAt,
  travelCompanion,
  travelStyle,
  name,
  profileImageUrl,
  thumbnailImageUrl,
  bookmarkCount,
  isBookmarked,
  isEditable = false,
  isPlanTab = false,
  onClick
}: TravelCardProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const combinedTags = [travelCompanion, ...travelStyle];

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = () => {
    if (menuVisible) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div
      className="relative flex w-full max-w-[320px] flex-col overflow-hidden rounded-lg bg-white-01 shadow-[0_0_10px_0_rgba(0,0,0,0.08)] sm:max-w-[320px] md:max-w-[640px] md:flex-row lg:max-w-[730px] xl:max-w-[730px] 2xl:max-w-[730px]"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {/* 책갈피 아이콘 */}
      <div className="absolute left-4 top-4 z-10 h-9 w-9 flex-shrink-0 rounded-[5px] bg-white-01 p-2 backdrop-blur-[10px]">
        {isBookmarked ? (
          <ImageBox
            className="h-full w-full"
            src="/icons/bookmark-filled.svg"
            alt="bookmarked"
            width={18}
            height={18}
          />
        ) : (
          <ImageBox className="h-full w-full" src="/icons/bookmark.svg" alt="not bookmarked" width={18} height={18} />
        )}
      </div>
      {/* 케밥 메뉴 */}
      {isEditable && isPlanTab && (
        <div className="absolute right-4 top-4">
          <button type="button" onClick={handleMenuClick} className="flex h-4 w-4 items-center justify-center">
            <ImageBox className="h-full" src="/icons/kebab.svg" alt="kebab menu" width={16} height={16} />
          </button>
          {menuVisible && (
            <div className="absolute right-0 mt-2 flex w-[110px] flex-col gap-4 rounded-md bg-white-01 p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
              <button type="button" className="font-btn-text block w-full text-left text-black-01">
                수정하기
              </button>
              <button type="button" className="font-btn-text block w-full text-left text-red-01">
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}
      {/* 대표 이미지 */}
      <div className="relative h-[180px] w-full flex-shrink-0 md:h-[195px] md:w-[280px]">
        <ImageBox
          className="h-full w-full object-cover"
          src={thumbnailImageUrl}
          alt={thumbnailImageUrl}
          width={280}
          height={195}
        />
      </div>
      {/* 콘텐츠 */}
      <div className="flex flex-grow flex-col">
        {/* 상단 각종 데이터 */}
        <div className="flex flex-col gap-2 border-b border-gray-03 p-4">
          <p className="font-subtitle-1 w-full truncate md:w-auto md:pr-20">{title}</p>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[6px]">
              <ImageBox src="/icons/map-pin.svg" alt="location" className="h-4 w-4" width={16} height={16} />
              <span className="font-subtitle-3 text-gray-01">{city.join(', ')}</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <ImageBox src="/icons/calendar.svg" alt="calendar" className="h-4 w-4" width={16} height={16} />
              <span className="font-subtitle-3 text-gray-01">
                {startAt} ~ {endAt}
              </span>
            </div>
          </div>
          {/* 추후 컴포넌트 추가 */}
          <div className="flex-row-center flex-wrap gap-2">
            {combinedTags.map((item) => (
              <p key={item} className="flex-shrink-0 bg-slate-300">
                #{item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex-row-center justify-between p-4">
          <div className="flex-row-center gap-2">
            <ImageBox
              className="size-full max-h-8 max-w-8 rounded-full"
              src={profileImageUrl}
              alt={profileImageUrl}
              width={8}
              height={8}
            />
            <p className="font-caption-2 text-black-01">{name}</p>
          </div>
          <div className="flex-row-center gap-1 p-1">
            <div className="inline h-[11px] w-[11px]">
              <ImageBox src="/icons/bookmark-gray.svg" alt="bookmark count" className="inline" width={11} height={11} />
            </div>
            <span className="font-caption-3 text-gray-01">{bookmarkCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
