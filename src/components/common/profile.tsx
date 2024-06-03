import React from 'react';

import Image from 'next/image';

interface ProfileProps {
  image?: string;
  size: 'sm' | 'lg';
}

const sizeList = {
  sm: 'w-8 h-8',
  lg: 'w-32 h-32'
};

export default function Profile({ image, size }: ProfileProps) {
  // 디폴트 이미지
  const defaultImage =
    'https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1577544307/noticon/a7cmr2ibsfyuwcydpvny.png';

  const imageSource = image || defaultImage;

  return (
    <div className={`relative overflow-hidden rounded-full ${sizeList[size]}`}>
      <Image src={imageSource} alt="Profile" layout="fill" objectFit="cover" className="rounded-full" />
    </div>
  );
}
