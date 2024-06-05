import React from 'react';

interface AddScheduleButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function AddScheduleButton({ onClick, size = 'lg' }: AddScheduleButtonProps) {
  const baseStyles = 'flex justify-center items-center rounded-md h-12';

  const sizeStyles = {
    sm: 'max-w-[285px]',
    md: 'max-w-[320px]',
    lg: 'max-w-[346px]'
  };

  return (
    <button type="button" onClick={onClick} className={`${baseStyles} ${sizeStyles[size]}`}>
      {/* 플러스 아이콘 추가 */}
    </button>
  );
}
