/* eslint-disable max-len */

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

import PartitionSvg from '@/icons/partition.svg';

export type Position = 'left' | 'bottom';

interface ResizableComponentProps {
  className?: string;
  position: Position;
  initialSize: string;
  minSize: string;
  maxSize: string;
  children: React.ReactNode;
  bgChildren?: React.ReactNode;
}

export default function ResizableComponent({
  className,
  position,
  initialSize,
  minSize,
  maxSize,
  children,
  bgChildren
}: ResizableComponentProps) {
  const [size, setSize] = useState(0);
  const [startSize, setStartSize] = useState(0);
  const [startMousePosition, setStartMousePosition] = useState(0);
  const [minSizePx, setMinSizePx] = useState(0);
  const [maxSizePx, setMaxSizePx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const resizerRef = useRef<HTMLButtonElement>(null);

  const isHorizontal = position === 'left';

  const calculateSize = useCallback(
    (currSize: string) => {
      if (currSize.endsWith('vw')) {
        return (parseFloat(currSize) / 100) * window.innerWidth;
      }
      if (currSize.endsWith('vh')) {
        return (parseFloat(currSize) / 100) * window.innerHeight;
      }
      if (currSize.endsWith('%')) {
        return (parseFloat(currSize) / 100) * (isHorizontal ? window.innerWidth : window.innerHeight);
      }
      return parseFloat(currSize);
    },
    [isHorizontal]
  );

  const updateSizes = useCallback(() => {
    setMinSizePx(calculateSize(minSize));
    setMaxSizePx(calculateSize(maxSize));
    const initialSizePx = calculateSize(initialSize);
    setSize(initialSizePx);
  }, [calculateSize, initialSize, minSize, maxSize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartSize(size);
    if (isHorizontal) {
      setStartMousePosition(e.clientX);
    } else {
      setStartMousePosition(e.clientY);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (resizerRef.current) {
        if (isHorizontal) {
          const newSize = startSize + (e.clientX - startMousePosition);
          if (newSize >= minSizePx && newSize <= maxSizePx) {
            setSize(newSize);
          }
        } else {
          const newSize = startSize - (e.clientY - startMousePosition);
          if (newSize >= minSizePx && newSize <= maxSizePx) {
            setSize(newSize);
          }
        }
      }
    },
    [isHorizontal, minSizePx, maxSizePx, startSize, startMousePosition]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    updateSizes();
  }, [updateSizes]);

  useEffect(() => {
    const handleResize = () => {
      updateSizes();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateSizes]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div className={className}>
      <div className="relative h-[calc(100vh-3.75rem)] overflow-hidden md:h-[calc(100vh-4.5rem)]">
        <style jsx global>{`
          body {
            user-select: ${isDragging ? 'none' : 'auto'};
          }
        `}</style>
        {/* 외부 콘텐츠 */}
        {bgChildren}
        {/* 드래그 가능한 창 */}
        <div
          className={`absolute bottom-0 left-0 flex bg-white-01 shadow-modal ${isHorizontal ? 'top-0 pr-5' : 'right-0 rounded-t-2xl'} `}
          style={isHorizontal ? { width: `${size}px` } : { height: `${size}px` }}
        >
          {/* 내부 콘텐츠 */}
          <div className="scrollbar-custom w-full overflow-auto max-md:scrollbar-hide">{children}</div>
          {/* 드래그 바 */}
          <button
            type="button"
            className={` absolute top-0 ${
              isHorizontal
                ? 'flex-row-center right-0 h-full w-5 cursor-ew-resize'
                : 'flex-col-center top-0 h-5 w-full cursor-ns-resize pt-3'
            }`}
            ref={resizerRef}
            onMouseDown={handleMouseDown}
          >
            {isHorizontal ? (
              <PartitionSvg width={20} height={20} />
            ) : (
              <div className="h-[0.3125rem] w-16 rounded-full bg-gray-02" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
