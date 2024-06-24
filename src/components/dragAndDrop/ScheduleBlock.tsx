import { BudgetTabContent, TravelTabContent } from '@/components/dragAndDrop/TabContent';
import { TabContentProps } from '@/libs/types/dragAndDropType';
import { TAB } from '@/libs/types/planDetailType.js';

// 탭 블록 콘텐츠 객체
export default function ScheduleBlock({ schedule, selectedTab, ...props }: TabContentProps & { selectedTab: TAB }) {
  if (selectedTab === 'plan') return <TravelTabContent schedule={schedule} {...props} />;
  if (selectedTab === 'budget') return <BudgetTabContent schedule={schedule} {...props} />;
  return null;
}
