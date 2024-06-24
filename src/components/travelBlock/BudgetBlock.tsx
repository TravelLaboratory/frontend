import React from 'react';

import Badge from '@/components/common/Badge';
import { Category } from '@/libs/types/commonPlanType';

export interface BudgetBlockProps extends React.HTMLAttributes<HTMLButtonElement> {
  name: string;
  category: Category;
  symbol: string;
  money: string;
}

export default function BudgetBlock({ name, category, symbol, money, onClick, ...props }: BudgetBlockProps) {
  const currSymbol: { [key: string]: string } = {
    KRW: '원',
    USD: '달러'
  };

  return (
    <button className="w-full rounded-[0.3125rem] p-4 shadow-modal" type="button" onClick={onClick} {...props}>
      <div className="flex w-full gap-2">
        {/* 각종 정보, 이미지 */}
        <div className="flex-row-center w-full justify-between gap-2">
          <div className="flex flex-col items-start">
            {/* 카테고리 */}
            <Badge className="mb-[0.375rem] inline-block" type={category}>
              {category}
            </Badge>
            {/* 장소 */}
            <p className="font-subtitle-2 mb-2 line-clamp-1">{name}</p>
            {/* 비용 */}
            <p className="font-subtitle-1 line-clamp-1 text-point">
              {money}
              {currSymbol?.[symbol] || symbol}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
