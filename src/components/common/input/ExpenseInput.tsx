import React, { forwardRef, useEffect, useState } from 'react';

import Input from '@/components/common/input/Input';
import { addNumberCommas, removeNumberCommas } from '@/libs/utils/moneyFormatter';

interface ExpenseInputProps {
  className?: string;
  defaultValue?: string;
  id: string;
  initialValue: number;
  digit?: number;
  placeholder?: string;
  onlyInteger?: boolean;
  onChangeExpense?: (newValue: number) => void;
}

const ExpenseInput = forwardRef(function ExpenseInput(
  {
    className,
    defaultValue = '',
    id,
    digit = 12,
    initialValue,
    placeholder,
    onlyInteger,
    onChangeExpense
  }: ExpenseInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [expense, setExpense] = useState(defaultValue);

  useEffect(() => {
    if (initialValue) {
      setExpense(addNumberCommas(`${initialValue}`));
    }
  }, [initialValue]);

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
    onChangeExpense?.(+e.target.value);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextExpense = e.target.value.replace(/[^\d.]/g, '');

    if (e.target.value.length > digit) {
      setExpense(expense);
      return;
    }

    if (e.target.value.includes('.') && onlyInteger) {
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
      className={`w-full ${className}`}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

export default ExpenseInput;
