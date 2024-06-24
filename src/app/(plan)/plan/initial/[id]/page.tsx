import PlanInitialForm from '@/components/PlanInitialForm';

function Plan({ params }: { params: { id: string } }) {
  return <PlanInitialForm articlePageId={params.id} />;
}

export default Plan;
