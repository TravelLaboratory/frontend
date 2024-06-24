import React from 'react';

import { CoreBlockProps } from '@/components/travelBlock/CoreBlock';
import EtcBlock from '@/components/travelBlock/EtcBlock';
import PlanBlock from '@/components/travelBlock/PlanBlock';
import TransportBlock from '@/components/travelBlock/TransportBlock';

function TravelBlock({ ...blockProps }: CoreBlockProps) {
  const { category } = blockProps;

  if (category === '기타') return <EtcBlock {...blockProps} />;
  if (category === '교통') return <TransportBlock {...blockProps} />;
  return <PlanBlock {...blockProps} />;
}

export default TravelBlock;
