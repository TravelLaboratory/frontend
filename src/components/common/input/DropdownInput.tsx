import React from 'react';

import Button from '@/components/common/button/Button';
import DropdownButton from '@/components/common/button/DropdownButton';
import Dropdown from '@/components/common/Dropdown';
import useDropdownEdit from '@/libs/hooks/useDropdownEdit';
import useResizeSize from '@/libs/hooks/useResizeSize';

interface DropdownInputProps {
  id: string;
  containerClassName?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  listClassName?: string;
  value: string;
  dropdownList: any[];
  onClickInside: (e?: any) => void;
}

export default function DropdownInput({
  id,
  containerClassName,
  buttonClassName,
  dropdownClassName,
  listClassName,
  value,
  dropdownList,
  onClickInside
}: DropdownInputProps) {
  const { ref, isDropdownOpened, handleDropdownToggle, handleDropdownClose } = useDropdownEdit(id);
  const { divRef, divHeight } = useResizeSize();

  const handleDropdownSelect = (e: any) => {
    onClickInside(e);
    handleDropdownClose();
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div ref={divRef}>
        <DropdownButton
          className={buttonClassName}
          isDropdownOpened={isDropdownOpened}
          onClick={(e: any) => handleDropdownToggle(e)}
        >
          {value}
        </DropdownButton>
      </div>
      {isDropdownOpened && (
        <Dropdown
          className={`scrollbar-custom absolute w-full overflow-auto px-0 py-[0.625rem] ${dropdownClassName}`}
          style={{ top: `${divHeight + 8}px` }}
          ref={ref}
        >
          {dropdownList.map((item) => (
            <Button
              className={`modal-dropdown w-full cursor-pointer p-3 hover:bg-primary-02 ${listClassName}`}
              key={item}
              onClick={handleDropdownSelect}
            >
              {item}
            </Button>
          ))}
        </Dropdown>
      )}
    </div>
  );
}
