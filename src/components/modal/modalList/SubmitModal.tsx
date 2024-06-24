/* eslint-disable no-undef */
/* eslint-disable max-len */

'use client';

import Button from '@/components/common/button/Button';
import Modal, { ModalProps } from '@/components/modal/Modal';

export interface DeleteModalProps extends ModalProps {
  text: string;
  submitText: string;
  negative?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
}

// edit 모드 여부 설정해야 함
export default function SubmitModal({
  text,
  onCancel,
  onSubmit,
  submitText,
  negative = false,
  ...props
}: DeleteModalProps) {
  const handleCancelButtonClick = () => {
    onCancel?.();
  };

  const handleSubmitButtonClick = () => {
    onSubmit?.();
  };

  return (
    <Modal {...props}>
      <p className="font-subtitle-2 md:font-title-4 mb-6 mt-4 text-center">{text}</p>
      <div className="flex flex-col gap-10">
        <div className="flex-row-center gap-3">
          <Button
            onClick={handleCancelButtonClick}
            className="font-btn-3 md:font-btn-2 btn-outline h-12 w-full gap-x-2.5 rounded-md"
          >
            취소하기
          </Button>
          <Button
            onClick={handleSubmitButtonClick}
            className={`font-btn-3 md:font-btn-2 h-12 w-full gap-x-2.5 rounded-md ${negative ? 'btn-red' : 'btn-solid'}`}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
