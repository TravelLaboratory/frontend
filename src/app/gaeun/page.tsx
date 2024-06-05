import TodayPlan from '@/components/TodayPlan';
import mockImage from '@/images/mockImage.jpg';

export default function gaeun() {
  return (
    <TodayPlan
      ImageUrl={mockImage}
      TravelTitle="가은이의 여행"
      TravelDate="2024.10.10 ~ 2024.11.11"
      TravelSite="아말피"
    />
  );
}
