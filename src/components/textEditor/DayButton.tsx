import React from 'react';

interface DayButtonProps {
  day: number;
  activeDay: null | number;
  handleDayButtonClick: (day: number) => void;
}

function DayButton({ activeDay, day, handleDayButtonClick }: DayButtonProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDayButtonClick(day);
    }
  };

  return (
    <div
      onClick={() => handleDayButtonClick(day)}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      className={`flex h-[40px] cursor-pointer items-center justify-center rounded-3xl border-2 px-[20px] py-[7px] ${
        activeDay === day ? 'text-white border-none bg-black-01 text-slate-50' : 'hover:bg-gray-200 hover:text-slate-50'
      }`}
    >
      Day {day}
    </div>
  );
}

export default DayButton;
