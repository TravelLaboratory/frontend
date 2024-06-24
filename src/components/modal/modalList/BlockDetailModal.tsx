/* eslint-disable no-undef */

'use client';

import { useState } from 'react';

import Badge from '@/components/common/Badge';
import Button from '@/components/common/button/Button';
import DropdownInput from '@/components/common/input/DropdownInput';
import Input from '@/components/common/input/Input';
import Modal, { ModalProps } from '@/components/modal/Modal';
import BlockDetailModalContent from '@/components/modal/modalList/BlockDetailModalContent';
import {
  DROPDOWN_AMPM,
  DROPDOWN_HOUR,
  DROPDOWN_MINUTE,
  DropdownAmPm,
  DropdownHour,
  DropdownMinute
} from '@/libs/constants/modal';
import { GoogleMapsApiReturn } from '@/libs/hooks/useGoogleMapsApi';
import {
  EtcBlockDetailData,
  OnBlockDetailEdit,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/libs/types/modalType';

// startAt으로부터 오전/오후를 반환하는 함수
function getAmPmFromStartAt(startAt: string): DropdownAmPm {
  const hour = Number(startAt.split(':')[0]);
  if (hour < 12) return '오전';
  return '오후';
}

// startAt으로부터 24H -> 12H로 변환하는 함수
function getHourFromStartAt(startAt: string): DropdownHour {
  const hour = Number(startAt.split(':')[0]) % 12;
  if (hour === 0) return '12';
  if (hour >= 1 && hour <= 9) return `0${hour.toString()}` as DropdownHour;
  return hour.toString() as DropdownHour;
}

// 오전/오후를 반영하여 12H -> 24H로 변환하는 함수
function getHourByAmPm(amPm: DropdownAmPm, hour: DropdownHour) {
  if (amPm === '오전' && hour === '12') return '00';
  if (amPm === '오후') {
    const newHour = Number(hour) + 12;
    if (newHour === 24) return '12';
    return newHour.toString();
  }
  return hour;
}

export interface BlockDetailModalProps extends ModalProps, GoogleMapsApiReturn {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
  onSubmit?: OnBlockDetailEdit;
  isEdit?: boolean;
}

// edit 모드 여부 설정해야 함
export default function BlockDetailModal({
  blockData,
  onSubmit = () => {},
  isLoaded,
  isEdit = false,
  ...props
}: BlockDetailModalProps) {
  const [amPm, setAmPm] = useState<DropdownAmPm>(getAmPmFromStartAt(blockData.startAt));
  const [startAt, setStartAt] = useState<{ hour: DropdownHour; minute: DropdownMinute }>({
    hour: getHourFromStartAt(blockData.startAt.split(':')[0]) as DropdownHour,
    minute: blockData.startAt.split(':')[1] as DropdownMinute
  });
  const [duration, setDuration] = useState<{ hour: DropdownHour; minute: DropdownMinute }>({
    hour: blockData.duration.split(':')[0] as DropdownHour,
    minute: blockData.duration.split(':')[1] as DropdownMinute
  });
  const [memo, setMemo] = useState(blockData.memo);

  // 드롭다운 입력
  const handleDropdownSelect = {
    ApPm: (e: any) => {
      const newAmPm = e.target.textContent;
      setAmPm(newAmPm);
    },
    startAtHour: (e: any) => {
      const hour = e.target.textContent;
      setStartAt({ ...startAt, hour });
    },
    startAtMinute: (e: any) => {
      const minute = e.target.textContent;
      setStartAt({ ...startAt, minute });
    },
    durationHour: (e: any) => {
      const hour = e.target.textContent;
      setDuration({ ...duration, hour });
    },
    durationMinute: (e: any) => {
      const minute = e.target.textContent;
      setDuration({ ...duration, minute });
    }
  };

  const handleMemoChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMemo(e.target.value);
  };

  // 편집 완료 버튼 클릭
  const handleSubmitButtonClick = () => {
    const newHour = getHourByAmPm(amPm, startAt.hour);
    const newStartAt = `${newHour}:${startAt.minute}`;
    const newDuration = `${duration.hour}:${duration.minute}`;
    const newBlockData = { ...blockData, startAt: newStartAt, duration: newDuration, memo };
    onSubmit(newBlockData);
  };

  return (
    <Modal {...props}>
      <div className="flex flex-col gap-10">
        <div>
          <Badge type={blockData.category} className="mb-2">
            {blockData.category}
          </Badge>
          <p className="modal-h1 mb-3">{blockData.name}</p>
          <BlockDetailModalContent blockData={blockData} isLoaded={isLoaded} />
        </div>
        {/* 방문 시간 */}
        <div className="font-body-2 z-10">
          <p className="modal-h2 mb-4">방문 시간</p>
          {isEdit ? (
            <div className="flex-row-center">
              <DropdownInput
                id="amPm"
                containerClassName="w-[5.5rem] mr-3"
                listClassName="text-center"
                value={amPm}
                dropdownList={DROPDOWN_AMPM}
                onClickInside={handleDropdownSelect.ApPm}
              />
              <DropdownInput
                id="startAtHour"
                containerClassName="w-20 mr-2"
                dropdownClassName="h-[9rem]"
                listClassName="text-center"
                value={startAt.hour}
                dropdownList={DROPDOWN_HOUR}
                onClickInside={handleDropdownSelect.startAtHour}
              />
              <p className="mr-3">시</p>
              <DropdownInput
                id="startAtMinute"
                containerClassName="w-20 mr-2"
                dropdownClassName="h-[9rem]"
                listClassName="text-center"
                value={startAt.minute}
                dropdownList={DROPDOWN_MINUTE}
                onClickInside={handleDropdownSelect.startAtMinute}
              />
              <p>분</p>
            </div>
          ) : (
            <p>
              {amPm} {Number(startAt.hour)}시 {Number(startAt.minute)}분
            </p>
          )}
        </div>
        {/* 소요 시간 */}
        <div className="font-body-2">
          <p className="modal-h2 mb-4">소요 시간</p>
          {isEdit ? (
            <div className="flex-row-center">
              <DropdownInput
                id="durationHour"
                containerClassName="w-20 mr-2"
                dropdownClassName="h-[9rem]"
                listClassName="text-center"
                value={duration.hour}
                dropdownList={DROPDOWN_HOUR}
                onClickInside={handleDropdownSelect.durationHour}
              />
              <p className="mr-3">시간</p>
              <DropdownInput
                id="durationMinute"
                containerClassName="w-20 mr-2"
                dropdownClassName="h-[9rem]"
                listClassName="text-center"
                value={duration.minute}
                dropdownList={DROPDOWN_MINUTE}
                onClickInside={handleDropdownSelect.durationMinute}
              />
              <p>분</p>
            </div>
          ) : (
            <p>
              {Number(duration.hour)}시간 {Number(duration.minute)}분
            </p>
          )}
        </div>
        {/* 메모 */}
        <form onSubmit={handleSubmitButtonClick}>
          <div className="font-body-2">
            <p className="modal-h2 mb-4">메모</p>
            {isEdit ? (
              <Input
                id="blockDetailMemo"
                className="w-full rounded-[0.3125rem] border border-solid border-gray-01 px-4 py-3"
                value={memo}
                placeholder="메모를 입력하세요."
                onChange={handleMemoChange}
              />
            ) : (
              <p>{blockData.memo}</p>
            )}
          </div>
        </form>
        {/* 편집 완료 버튼 */}
        {isEdit && (
          <Button onClick={handleSubmitButtonClick} className="btn-lg btn-solid w-full flex-shrink-0">
            완료하기
          </Button>
        )}
      </div>
    </Modal>
  );
}
