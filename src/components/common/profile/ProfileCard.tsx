import React, { useRef } from 'react';

import Button from '@/components/common/button/Button';
import ImageBox from '@/components/common/ImageBox';
import Input from '@/components/common/input/Input';
import Textarea from '@/components/common/input/Textarea';
import useMediaQuery from '@/hooks/useMediaQuery';

interface ProfileCardProps {
  name: string;
  bio?: string;
  imageUrl?: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onImageChange: (newImageUrl: string) => void;
  onNameChange: (newName: string) => void;
  onBioChange: (newBio: string) => void;
  canEdit: boolean;
}

export default function ProfileCard({
  name,
  bio,
  imageUrl,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onImageChange,
  onNameChange,
  onBioChange,
  canEdit
}: ProfileCardProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = !isTablet && !isDesktop;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayBio = bio || '한 줄 소개가 없습니다.';
  const displayImageUrl = imageUrl || '/icons/profile-default.svg';

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop && canEdit && isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (isDesktop && e.currentTarget === e.target && canEdit && isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDesktop && canEdit && isEditing && fileInputRef.current) {
      e.stopPropagation();
      fileInputRef.current.click();
    }
  };

  const renderEditButton = () => {
    if (isMobile) {
      return (
        <button type="button" onClick={onEdit}>
          편집
        </button>
      );
    }
    if (isTablet) {
      return (
        <Button className="btn-ghost btn-sm" onClick={onEdit}>
          편집하기
        </Button>
      );
    }
    return (
      <Button className="btn-ghost btn-md" onClick={onEdit}>
        편집하기
      </Button>
    );
  };

  const renderActionButtons = () => {
    if (isDesktop) {
      return (
        <div className="mt-4 flex w-full space-x-2">
          <Button className="btn-outline btn-md w-[146px] !min-w-0" onClick={onCancel}>
            취소하기
          </Button>
          <Button className="btn-solid btn-md w-[146px] !min-w-0" onClick={onSave}>
            완료하기
          </Button>
        </div>
      );
    }
    return (
      <div className=" flex space-x-[12px]">
        <button type="button" className="font-btn flex-shrink-0 text-black-02" onClick={onCancel}>
          취소
        </button>
        <button type="button" className="font-btn flex-shrink-0 text-black-02" onClick={onSave}>
          완료
        </button>
      </div>
    );
  };

  return (
    <div className={`relative rounded-lg bg-white-01 p-6 shadow-md ${isDesktop ? 'w-[22rem] pt-10' : 'w-full'}`}>
      <div className={`flex ${isDesktop ? 'flex-col items-center' : 'items-center space-x-4'}`}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className={`relative flex items-center justify-center ${
            isDesktop ? 'h-[185px] w-[185px]' : isTablet ? 'h-[120px] w-[120px]' : 'h-[80px] w-[80px]'
          }`}
          onClick={handleImageClick}
          role="button"
          tabIndex={0}
        >
          <ImageBox
            src={displayImageUrl}
            alt="Profile Image"
            width={isDesktop ? 185 : isTablet ? 120 : 80}
            height={isDesktop ? 185 : isTablet ? 120 : 80}
            className="h-full w-full rounded-full"
          />
          {canEdit && isEditing && (
            <>
              <button
                type="button"
                onClick={handleButtonClick}
                // eslint-disable-next-line max-len
                className={`absolute bottom-0 right-0 flex h-[3.375rem] w-[3.375rem] items-center justify-center rounded-full border-solid border-gray-02 bg-white-01 ${isDesktop ? 'block' : 'hidden'}`}
              >
                <div className="relative h-8 w-8">
                  <ImageBox src="/icons/camera.svg" alt="Camera Icon" width={8} height={8} className="rounded-full" />
                </div>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => e.target.files && onImageChange(URL.createObjectURL(e.target.files[0]))}
              />
            </>
          )}
        </div>
        <div className={`${isDesktop ? 'mt-[1.25rem] text-center' : 'flex-1'}`}>
          {!isEditing ? (
            <>
              <h2 className="font-subtitle-1 text-black-01">{name}</h2>
              <p className="font-body-2 mt-1 text-black-03">{displayBio}</p>
            </>
          ) : (
            <>
              <Input
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                className="mb-2 w-full rounded border px-2 py-1"
                placeholder="닉네임을 입력하세요"
              />
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => onBioChange(e.target.value)}
                className="w-full resize-none rounded border px-2 py-1 focus:outline-none"
                placeholder="한 줄 소개를 입력하세요"
              />
            </>
          )}
        </div>
        {canEdit && (
          <div className={`${isDesktop ? 'mt-4' : 'absolute right-6 top-6'}`}>
            {!isEditing ? renderEditButton() : renderActionButtons()}
          </div>
        )}
      </div>
    </div>
  );
}