import { DefaultCardProps } from '@/components/card/type';
import ImageBox from '@/components/common/ImageBox';

export interface CircleCardProps extends DefaultCardProps {}

export default function CircleCard({ title, imageUrl, onClick }: CircleCardProps) {
  return (
    <button className="relative size-40 overflow-hidden rounded-full" type="button" onClick={onClick}>
      <ImageBox className="size-40" src={imageUrl} alt={imageUrl} width={40} height={40} />
      <p className="absolute-center text-white">{title}</p>
    </button>
  );
}
