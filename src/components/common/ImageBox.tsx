import Image, { ImageProps } from 'next/image';

interface ImageBoxProps extends ImageProps {
  className?: string;
  placeholderClassName?: string;
  width: number;
  height: number;
}

/**
 * div로 감싸진 Image 컴포넌트입니다.
 * overflow-hidden, image-cover, width*4, height*4 가 적용되어 있습니다.
 * @param className string; div className
 * @param width number; Image width
 * @param height number; Image height
 * @param ...restImageProps 기타 모든 ImageProps를 대응합니다.
 */

export default function ImageBox({
  className,
  placeholderClassName,
  src,
  alt,
  width,
  height,
  ...restImageProps
}: ImageBoxProps) {
  if (!src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className={`size-full ${placeholderClassName}`} />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <Image src={src} alt={alt} width={width * 4} height={height * 4} className="image-cover" {...restImageProps} />
    </div>
  );
}
