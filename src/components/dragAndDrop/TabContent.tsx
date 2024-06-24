import { useEffect, useState } from 'react';

import BudgetBlock from '@/components/travelBlock/BudgetBlock';
import TravelBlock from '@/components/travelBlock/TravelBlock';
import useGoogleMapsPlaceDetails from '@/libs/hooks/useGoogleMapsPlaceDetails';
import { TabContentProps } from '@/libs/types/dragAndDropType';

// 일정 탭 블록
export function TravelTabContent({ schedule, ...props }: TabContentProps) {
  const [photo, setPhoto] = useState('');

  const placeId = {
    GENERAL: schedule.schedule_general?.google_map_place_id,
    TRANSPORT: schedule.schedule_transport?.google_map_start_place_address,
    ETC: null
  };
  const { place } = useGoogleMapsPlaceDetails(placeId[schedule.dtype] || '');

  useEffect(() => {
    const placePhoto = place?.photos?.[0].getUrl({ maxWidth: 103 * 4, maxHeight: 103 * 4 });
    if (placePhoto) setPhoto(placePhoto);
  }, [place]);

  if (schedule.dtype === 'GENERAL') {
    return (
      <TravelBlock
        index={schedule.sort_order}
        name={schedule.schedule_general?.place_name || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        imageUrl={photo}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    return (
      <TravelBlock
        index={schedule.sort_order}
        name={schedule.schedule_transport?.start_place_name || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        transport={schedule.schedule_transport?.transportation}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    return (
      <TravelBlock
        index={schedule.sort_order}
        name={schedule.schedule_etc?.place_name || '빈 이름'}
        category={schedule.category}
        memo={schedule.memo}
        startAt={schedule.visited_time}
        duration={schedule.duration_time}
        {...props}
      />
    );
  }
}

// 비용 탭 블록
export function BudgetTabContent({ schedule, ...props }: TabContentProps) {
  const [money, symbol] = schedule.expense.split(' ');

  if (schedule.dtype === 'GENERAL') {
    return (
      <BudgetBlock
        name={schedule.schedule_general?.place_name || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'TRANSPORT') {
    return (
      <BudgetBlock
        name={schedule.schedule_transport?.start_place_name || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }

  if (schedule.dtype === 'ETC') {
    return (
      <BudgetBlock
        name={schedule.schedule_etc?.place_name || ''}
        category={schedule.category}
        symbol={symbol}
        money={money}
        {...props}
      />
    );
  }
}
