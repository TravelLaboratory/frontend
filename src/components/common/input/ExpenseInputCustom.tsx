import React, { forwardRef, useEffect, useState } from 'react';

import Input from '@/components/common/input/Input';
import { addNumberCommas, removeNumberCommas } from '@/libs/utils/moneyFormatter';

interface ExpenseInputCustomProps {
  className?: string;
  defaultValue?: string;
  id: string;
  digit?: number;
  placeholder?: string;
  onChangeExpense?: (newValue: string) => void;
}

const ExpenseInputCustom = forwardRef(function ExpenseInput(
  { className, defaultValue = '', id, digit = 12, placeholder, onChangeExpense }: ExpenseInputCustomProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [expense, setExpense] = useState(defaultValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentValue = removeNumberCommas(e.target.value).toString();
    if (currentValue.length > digit) return;

    setExpense(e.target.value);
  };

  useEffect(() => {
    if (onChangeExpense) onChangeExpense(expense);
  }, [onChangeExpense, expense]);

  return (
    <Input
      type="text"
      id={id}
      value={expense}
      className={`w-full ${className}`}
      onChange={handleChange}
      placeholder={placeholder}
      formatter={addNumberCommas}
      ref={ref}
    />
  );
});

export default ExpenseInputCustom;
