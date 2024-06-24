import React from 'react';

import classNames from 'classnames';

/**
 * chip 컴포넌트
 * @component
 *
 * @param {('day' | 'default')} [variant='default'] - 칩의 변형
 * @param {boolean} selected - 칩의 선택 상태
 *
 * const [isSelected, setIsSelected] = useState(false);
 * <Chip variant="day" selected={isSelected} onClick={() => void}>
 *    Day 1
 * </Chip>
 */

const chipStyles = {
  base: 'flex px-5 py-1.75 justify-center items-center gap-2.5 rounded-full font-caption-1',
  selected: {
    day: 'border border-solid border-black-01 bg-black-01 text-white-01',
    default: 'border border-solid border-secondary-01 bg-white text-secondary-01'
  },
  unselected: {
    day: 'border border-solid border-gray-02 bg-white-01 text-black-02',
    default: 'border border-solid border-gray-02 bg-white-01 text-black-02'
  },
  height: {
    day: 'h-10',
    default: 'h-9'
  }
} as const;

type Variant = 'day' | 'default';
type State = 'selected' | 'unselected';

interface ChipProps {
  className?: string;
  children: React.ReactNode;
  variant?: Variant;
  selected: boolean;
  onClick?: () => void;
}

export default function Chip({ className, children, variant = 'default', selected, onClick }: ChipProps) {
  const variantKey: Variant = variant || 'default';
  const stateKey: State = selected ? 'selected' : 'unselected';

  const chipClass = classNames(
    chipStyles.base,
    chipStyles[stateKey][variantKey],
    chipStyles.height[variantKey],
    className
  );

  return (
    <button type="button" className={chipClass} onClick={onClick}>
      {children}
    </button>
  );
}
