import React from 'react';

import GNB from '@/components/common/GNB';

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      {children}
    </>
  );
}
