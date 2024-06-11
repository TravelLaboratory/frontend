import React, { forwardRef, useState } from 'react';

import Input from '@/components/common/input/Input';
import { addNumberCommas, removeNumberCommas } from '@/libs/utils/moneyFormatter';

interface ExpenseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  digit?: number;
}

const ExpenseInput = forwardRef(function ExpenseInput(
  { id, digit = 12, ...rest }: ExpenseInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [expense, setExpense] = useState('');

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!expense) {
      return;
    }

    const expenseNonComma = String(removeNumberCommas(e.target.value));
    setExpense(expenseNonComma);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') {
      setExpense('');
      return;
    }

    const formattedNumber = addNumberCommas(e.target.value);
    setExpense(formattedNumber);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextExpense = e.target.value.replace(/[^\d.]/g, '');

    if (e.target.value.length > digit) {
      setExpense(expense);
      return;
    }

    if (e.target.value.split('.').length > 2 || e.target.value === '.') {
      setExpense(expense);
      return;
    }

    setExpense(nextExpense);
  };

  return (
    <Input
      type="text"
      id={id}
      value={expense}
      className="w-full"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={ref}
      {...rest}
    />
  );
});

export default ExpenseInput;
