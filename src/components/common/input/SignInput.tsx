import React, { forwardRef } from 'react';

import Input from '@/components/common/input/Input';

const INPUT_STYLE = {
  default: 'peer bg-white-01 w-full h-12 px-3 pb-3 pt-[14px] rounded-[5px] border border-gray-02',
  focus: 'focus:border-primary-01',
  error: 'border-red-01 focus:border-red-01',
  text: 'font-body-2 text-black-01'
};

const LABEL_ERROR_STYLE = 'text-red-01 peer-focus-within:text-red-01';

interface SignInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  onClickInput?: () => void;
}

const SignInput = forwardRef(function SignInput(
  { label, id, errorMessage, onClickInput, ...rest }: SignInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const isError = !!errorMessage;

  return (
    <div className="flex flex-col-reverse gap-1">
      <Input
        className={`${INPUT_STYLE.default} ${INPUT_STYLE.text} ${INPUT_STYLE.focus} ${isError && INPUT_STYLE.error}`}
        id={id}
        ref={ref}
        onClick={onClickInput}
        {...rest}
      />
      <div className="flex-row-center gap-2 text-gray-01 peer-focus-within:text-primary-01">
        <label htmlFor={id} className={`font-subtitle-3 ${isError && LABEL_ERROR_STYLE}`}>
          {label}
        </label>
        {isError && <p className="font-caption-3 text-red-01">{errorMessage}</p>}
      </div>
    </div>
  );
});

export default SignInput;
