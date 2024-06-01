import React from 'react';

import Image from 'next/image';

import { DefaultCardProps } from '@/components/card/CircleCard';

interface ReviewCardProps extends DefaultCardProps {
  route: string[];
  user: { name: string; profileImg: string };
}

export default function ReviewCard({ imageUrl, title, route, user, onClick }: ReviewCardProps) {
  return (
    <button className="relative size-full max-h-80 max-w-80 overflow-hidden" type="button" onClick={onClick}>
      <Image src={imageUrl} alt={imageUrl} width={80 * 4} height={80 * 4} className="image-cover" />
      <div className="absolute bottom-4 left-4 text-white">
        <p>{title}</p>
        {route.map((item, idx) => (
          <>
            <span key={item}>{item}</span>
            {idx < route.length - 1 && <span> → </span>}
          </>
        ))}
        <div className="flex-row-center gap-2">
          <div className="relative size-full max-h-8 max-w-8 overflow-hidden rounded-full">
            <Image src={user.profileImg} alt={user.profileImg} width={8 * 4} height={8 * 4} className="image-cover" />
          </div>
          <span>{user.name}</span>
        </div>
      </div>
    </button>
  );
}
