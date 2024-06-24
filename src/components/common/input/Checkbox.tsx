'use client';

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, React.PropsWithChildren {}

// Checkbox 네이티브 대신 들어갈 내용을 children으로 전달한다
export default function Checkbox({ id, children, ...rest }: CheckboxProps) {
  return (
    <div className="relative">
      <label htmlFor={id}>{children}</label>
      <input type="checkbox" id={id} className="absolute inset-0 cursor-pointer opacity-0" {...rest} />
    </div>
  );
}
