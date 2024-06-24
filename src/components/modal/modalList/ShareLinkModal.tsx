/* eslint-disable no-undef */

'use client';

import Button from '@/components/common/button/Button';
import Modal, { ModalProps } from '@/components/modal/Modal';

export interface ShareLinkModalProps extends ModalProps {
  onSubmit?: () => void;
  imageUrl?: string;
}

// edit 모드 여부 설정해야 함
export default function ShareLinkModal({ onSubmit, imageUrl = '', ...props }: ShareLinkModalProps) {
  const currentLink = window.location.href;

  const handleCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(currentLink);
    if (onSubmit) onSubmit();
  };

  const handleShareKakaoButtonClick = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '트래블록 여행 계획',
        description: '다른 사람이 공유한 여행 계획을 확인해 보세요.',
        imageUrl,
        link: {
          mobileWebUrl: currentLink,
          webUrl: currentLink
        }
      },
      buttons: [
        {
          title: 'Open Link',
          link: {
            mobileWebUrl: currentLink,
            webUrl: currentLink
          }
        }
      ]
    });

    if (onSubmit) onSubmit();
  };

  return (
    <Modal {...props}>
      <p className="modal-h1 mb-[3.125rem] mt-5 text-center md:mb-[3.75rem] md:mt-0">여행 계획 공유하기</p>
      <div className="flex flex-col gap-10">
        {/* 비용 */}
        <p className="font-body-2 text-center">{currentLink}</p>
        {/* 링크 공유 버튼 */}
        <div className="flex-row-center gap-3">
          <Button
            onClick={handleCopyLinkButtonClick}
            className="font-subtitle-1 btn-outline h-12 w-full gap-x-2.5 rounded-md"
          >
            링크 복사
          </Button>
          <Button
            onClick={handleShareKakaoButtonClick}
            className="font-subtitle-1 btn-kakao h-12 w-full gap-x-2.5 rounded-md"
          >
            카카오톡으로 공유
          </Button>
        </div>
      </div>
    </Modal>
  );
}
