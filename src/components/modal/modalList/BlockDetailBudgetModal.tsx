/* eslint-disable no-undef */

'use client';

import { useState } from 'react';

import Button from '@/components/common/button/Button';
import ExpenseInputCustom from '@/components/common/input/ExpenseInputCustom';
import Modal, { ModalProps } from '@/components/modal/Modal';
import {
  EtcBlockDetailData,
  OnBudgetDetailEdit,
  PlaceBlockDetailData,
  TransportBlockDetailData
} from '@/libs/types/modalType';

const CURRENCY_SYMBOL: { [key: string]: string } = {
  KRW: '원'
};

export interface BlockDetailBudgetModalProps extends ModalProps {
  blockData: PlaceBlockDetailData | TransportBlockDetailData | EtcBlockDetailData;
  onSubmit?: OnBudgetDetailEdit;
  isEdit?: boolean;
}

// edit 모드 여부 설정해야 함
export default function BlockDetailBudgetModal({
  blockData,
  onSubmit = () => {},
  isEdit = false,
  ...props
}: BlockDetailBudgetModalProps) {
  const [budgetMoney, budgetSymbol] = blockData.budget.split(' ');
  const [money, setMoney] = useState(budgetMoney);

  const handleMoneyChange = (value: string) => {
    setMoney(value);
  };

  // 편집 완료 버튼 클릭
  const handleSubmitButtonClick = () => {
    const budget = `${money} ${budgetSymbol}`;
    onSubmit({ budget });
  };

  return (
    <Modal {...props}>
      <p className="modal-h1 mb-[3.125rem] mt-5 text-center md:mb-[3.75rem] md:mt-0">비용 상세</p>
      <div className="flex flex-col gap-10">
        {/* 비용 */}
        <form onSubmit={handleSubmitButtonClick}>
          <div className="font-body-2">
            <p className="modal-h2 mb-4">비용 ({CURRENCY_SYMBOL[budgetSymbol]})</p>
            {isEdit ? (
              <ExpenseInputCustom
                id="blockDetailExpense"
                className="w-full rounded-[0.3125rem] border border-solid border-gray-01 px-4 py-3"
                placeholder="비용를 입력하세요."
                defaultValue={money}
                onChangeExpense={(value: string) => handleMoneyChange(value)}
              />
            ) : (
              <p>{`${money} ${budgetSymbol === 'KRW' && '원'}`}</p>
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
