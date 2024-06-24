import React, { useState } from 'react';

import Input from '@/components/common/input/Input';

interface SearchInputParams extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  searchString?: string;
  onClickRemoveIcon?: () => void;
  onClickSearchIcon?: (searchString: string) => void;
}

export default function SearchInput({
  className,
  searchString: initialSearchString = '',
  onClickRemoveIcon,
  onClickSearchIcon,
  ...inputProps
}: SearchInputParams) {
  const [searchString, setSearchString] = useState(initialSearchString);

  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearchStringReset = () => {
    setSearchString('');
    if (onClickRemoveIcon) onClickRemoveIcon();
  };

  const handleSearchIconClick = () => {
    if (onClickSearchIcon) {
      onClickSearchIcon(searchString);
    }
  };

  return (
    <div className={`flex rounded-[0.375rem] bg-gray-03 px-3 py-[0.625rem] ${className}`}>
      <Input
        id="search"
        value={searchString}
        className="w-full bg-inherit"
        onChange={handleSearchStringChange}
        {...inputProps}
      />
      {searchString && (
        <button type="button" onClick={handleSearchStringReset}>
          X
        </button>
      )}
      <button type="submit" className="size-5 flex-shrink-0" onClick={handleSearchIconClick}>
        O
      </button>
    </div>
  );
}
