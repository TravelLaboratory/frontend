/* eslint-disable max-len */

import BudgetBlock from '@/components/travelBlock/BudgetBlock';
import CoreBlock from '@/components/travelBlock/CoreBlock';
import PlanBlock from '@/components/travelBlock/PlanBlock';
import TransportBlock from '@/components/travelBlock/TransportBlock';

export default function Jinho() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <CoreBlock name="CoreBlock" tag="태그" route={{ start: '출발지', end: '도착지' }} memo="메모입니다.">
        <div>추가 요소</div>
      </CoreBlock>
      <PlanBlock name="PlanBlock" tag="태그" memo="메모입니다." imageUrl="https://picsum.photos/600/600" />
      <TransportBlock
        name="TransportBlock"
        tag="subway"
        route={{ start: '출발지', end: '도착지' }}
        memo="메모입니다."
      />
      <BudgetBlock name="BudgetBlock" tag="태그" symbol="USD" money="1000000" />
    </div>
  );
}
