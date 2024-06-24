import { StaticImageData } from 'next/image';
import Link from 'next/link';

import ImageBox from '@/components/common/ImageBox';

interface TodayPlanProps {
  ImageUrl: StaticImageData; // 추후 string으로 변경 예정 ( 서버에서 받아오는 이미지 )
  TravelTitle: string;
  TravelDate: string;
  TravelSite: string;
}
export default function TodayPlan({ ImageUrl, TravelTitle, TravelDate, TravelSite }: TodayPlanProps) {
  return (
    <Link href="/">
      <div
        className="flex-row-center fixed bottom-16 left-1/2 
      -translate-x-1/2 justify-center gap-4 bg-teal-300 p-4"
      >
        <ImageBox className="size-16 rounded-full" src={ImageUrl} alt="TravelImage" width={16} height={16} />
        <div>
          <h1>{TravelTitle}</h1>
          <p>{TravelDate}</p>
          <p>{TravelSite}</p>
        </div>
      </div>
    </Link>
  );
}
