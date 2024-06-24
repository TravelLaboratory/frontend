import React from 'react';

import Badge from '@/components/common/Badge';
import ImageBox from '@/components/common/ImageBox';
import ClockSvg from '@/icons/clock.svg';
import { MARKER_COLOR } from '@/libs/constants/mapStyle';
import { Category, Transport } from '@/libs/types/commonPlanType';

export interface CoreBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  category: Category;
  transport?: Transport;
  index: number;
  imageUrl?: string;
  startAt: string;
  duration: string;
  memo?: string;
}

function CoreBlock({ index, name, category, memo, imageUrl, startAt, duration, onClick, ...props }: CoreBlockProps) {
  const indexStyle = {
    backgroundColor: MARKER_COLOR[category].bg,
    color: MARKER_COLOR[category].text
  };

  return (
    <button className="w-full rounded-[0.3125rem] p-3 shadow-modal" type="button" onClick={onClick} {...props}>
      <div className="flex w-full gap-2">
        <div className="font-tag relative size-6 flex-shrink-0 rounded-full text-center" style={indexStyle}>
          <p className="absolute-center">{index}</p>
        </div>
        <div className="w-full">
          <div className="flex-row-center mb-3 w-full justify-between gap-2">
            <div className="flex flex-col items-start">
              <p className="font-tag mb-2 text-gray-01">{startAt}</p>
              <Badge className="mb-[0.375rem] inline-block" type={category}>
                {category}
              </Badge>
              <p className="font-subtitle-2 mb-2 line-clamp-1">{name}</p>
              <div className="font-caption-2 flex-row-center line-clamp-1 gap-[0.125rem] text-gray-01">
                <ClockSvg width={16} height={16} />
                <p className="leading-none">{duration}</p>
              </div>
            </div>
            {imageUrl && (
              <ImageBox
                className="aspect-square size-full max-w-[6.4375rem] rounded-[0.3125rem]"
                placeholderClassName="bg-gray-02"
                src={imageUrl}
                alt={imageUrl}
                width={36}
                height={36}
              />
            )}
          </div>
          {memo && <p className="font-caption-2 line-clamp-1">{memo}</p>}
        </div>
      </div>
    </button>
  );
}

export default CoreBlock;
