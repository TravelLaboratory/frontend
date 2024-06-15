/* eslint-disable no-undef */
import { useState } from 'react';

import Chip from '@/components/common/button/Chip';
import Modal, { ModalProps } from '@/components/modal/Modal';
import CreateBlockModalContent from '@/components/modal/modalList/CreateBlockModalContent';
import { Category, OnEtcSelect, OnPlaceSelect, OnTransportSelect } from '@/components/modal/modalList/type';
import { CATEGORY_LIST, DEFAULT_CATEGORY } from '@/libs/constants/modal';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';

export interface CreateBlockModalProps extends ModalProps, GoogleMapsApiReturn {
  onPlaceSelect?: OnPlaceSelect;
  onTransportSelect?: OnTransportSelect;
  onEtcSelect?: OnEtcSelect;
  onSubmit?: () => void;
}

export default function CreateBlockModal({
  onPlaceSelect = () => {},
  onTransportSelect = () => {},
  onEtcSelect = () => {},
  isLoaded,
  ...props
}: CreateBlockModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(DEFAULT_CATEGORY);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handlePlaceSelect: OnPlaceSelect = ({ category, place }) => {
    if (onPlaceSelect) onPlaceSelect({ category, place });
  };

  return (
    <Modal {...props}>
      <p className="modal-h1 mb-[3.125rem] mt-5 text-center md:mb-[3.75rem] md:mt-0">블록 생성</p>
      {/* 종류 선택 */}
      <div className="mb-10">
        <div className="flex-row-center mb-3 gap-2">
          <p className="modal-h2">종류 선택</p>
          <p className="font-caption-2 text-black-03 ">1개 선택</p>
        </div>
        <div className="flex-row-center flex-wrap gap-[0.375rem]">
          {CATEGORY_LIST.map((category) => (
            <Chip
              key={category}
              variant="default"
              selected={category === selectedCategory}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </Chip>
          ))}
        </div>
      </div>
      {/* 장소 검색 */}
      {isLoaded && (
        <CreateBlockModalContent
          category={selectedCategory}
          onPlaceSelect={handlePlaceSelect}
          onTransportSelect={onTransportSelect}
          onEtcSelect={onEtcSelect}
        />
      )}
    </Modal>
  );
}
