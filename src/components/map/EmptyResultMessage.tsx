import React from 'react';

export default function EmptyResultMessage({ children }: { children: React.ReactNode }) {
  return <p className="font-caption-2 pb-8 pt-4 text-center text-gray-01">{children}</p>;
}
