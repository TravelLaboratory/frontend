import React from 'react';

import CoreBlock, { CoreBlockProps } from '@/components/travelBlock/CoreBlock';

/**
 * 숙소, 관광지, 식당, 액티비티, 기타 등의 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
function PlanBlock({ index, name, category, memo, imageUrl, startAt, duration, onClick, ...props }: CoreBlockProps) {
  return (
    <CoreBlock
      index={index}
      name={name}
      category={category}
      memo={memo}
      imageUrl={imageUrl}
      startAt={startAt}
      duration={duration}
      onClick={onClick}
      {...props}
    />
  );
}

export default PlanBlock;
