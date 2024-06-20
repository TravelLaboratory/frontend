'use client';

import React, { useState } from 'react';

import DayButton from '@/components/textEditor/DayButton';
import SlateEditor from '@/components/textEditor/SlateEditor';

function Page() {
  const days = 5;
  const [activeDay, setActiveDay] = useState<number>(1); // Default to the first day being active

  const handleDayButtonClick = (day: number) => {
    setActiveDay(day);
  };

  return (
    <div className="relative flex flex-col gap-10">
      <div>GNB</div>
      <div className="border-b-500 absolute top-[200px] w-full px-40">
        <div className="flex flex-col gap-[20px]">
          <input
            className="w-full text-[32px] focus:border-b-gray-500 focus:outline-none"
            placeholder="제목을 입력하세요"
            type="text"
          />
          <div className="border-b-2" />
          <div className="flex gap-[10px]">
            {[...Array(days)].map((_, index) => (
              <DayButton activeDay={activeDay} day={index + 1} handleDayButtonClick={handleDayButtonClick} />
            ))}
          </div>
          <div className="w-full rounded-xl bg-gray-400 px-[32px] py-[24px] text-[16px]">
            `후쿠오카공항 / 스시사카바 / 프린스 스마트 인 하카타 / 무이치몬 하카타점`
          </div>
        </div>
      </div>
      <div>
        {[...Array(days)].map((_, index) => (
          <div className={activeDay === index + 1 ? 'block' : 'hidden'}>
            <SlateEditor />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
