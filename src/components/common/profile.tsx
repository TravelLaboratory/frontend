import React from 'react';

interface ProfileProps {
  image: string;
  size: 'small' | 'large';
}

export default function Profile({ image, size }: ProfileProps) {
  /* 디자인에 따라서 사이즈 변경 */
  const sizeClasses = size === 'large' ? 'w-32 h-32' : 'w-8 h-8';

  return (
    <div className={`overflow-hidden rounded-full ${sizeClasses}`}>
      {/* 추후 Image로 변경 */}
      {image}
    </div>
  );
}
