import React, { useState } from 'react';

import Input from './Input';

interface SearchInputParams {
  searchString?: string;
}

export default function SearchInput({ searchString: initialSearchString }: SearchInputParams) {
  const [searchString, setSearchString] = useState(initialSearchString);

  const handleSearchStringChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchString(e.target.value);
  };

  const handleSearchStringReset = () => {
    setSearchString('');
  };

  return (
    <div className="bg-gray-03 flex h-10 rounded-[5px] px-3 pb-2 pt-[10px]">
      <Input id="search" value={searchString} className="w-full bg-inherit" onChange={handleSearchStringChange} />
      {searchString && (
        <button type="button" onClick={handleSearchStringReset}>
          X
        </button>
      )}
      <span className="size-5 flex-shrink-0">O</span>
    </div>
  );
}
