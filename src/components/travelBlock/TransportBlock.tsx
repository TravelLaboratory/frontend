import CoreBlock, { CoreBlockProps } from '@/components/travelBlock/CoreBlock';
import TransportBicycleUrl from '@/icons/transport-bicycle.svg?url';
import TransportCarUrl from '@/icons/transport-car.svg?url';
import TransportTrainUrl from '@/icons/transport-train.svg?url';
import TransportWalkUrl from '@/icons/transport-walk.svg?url';
import { Transport } from '@/libs/types/commonPlanType.js';

/**
 * 숙소, 관광지, 식당, 액티비티, 기타 등의 블록입니다.
 * @param name string; 이름
 * @param tag string; 태그
 * @param memo string; (optional) 메모
 * @param imageUrl string; (optional) 이미지 주소
 */
function TransportBlock({
  index,
  name,
  category,
  transport,
  memo,
  startAt,
  duration,
  onClick,
  ...props
}: CoreBlockProps) {
  const imageUrl: { [key in Transport]: string } = {
    자동차: TransportCarUrl,
    도보: TransportWalkUrl,
    자전거: TransportBicycleUrl,
    대중교통: TransportTrainUrl
  };

  return (
    <CoreBlock
      index={index}
      name={name}
      category={category}
      memo={memo}
      startAt={startAt}
      duration={duration}
      onClick={onClick}
      imageUrl={transport && imageUrl[transport]}
      {...props}
    />
  );
}

export default TransportBlock;
