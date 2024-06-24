import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-col-center mx-auto max-w-[550px] px-5 pb-14 pt-10">
      <div className="w-full border-b border-gray-02 pb-5">
        <h1 className="font-subtitle-1 md:font-title-4 mb-2 text-center text-primary-01 md:mb-3">여행 일정 생성</h1>
        <h2 className="font-title-3 md:font-title-1 text-center text-black-01">멋진 여행 계획을 세워보세요!</h2>
      </div>
      {children}
    </main>
  );
}
