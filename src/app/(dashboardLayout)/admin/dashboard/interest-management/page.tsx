import InterestManagementHeader from '@/components/modules/admin/interestManagement/InterestManagementHeader';
import InterestTable from '@/components/modules/admin/interestManagement/InterestTable';
import { getInterests } from '@/services/admin/interestManagement';

export default async function InterestManagementPage() {
  const interests = await getInterests()
  return (
    <div className={"space-y-6"}>
      <InterestManagementHeader />
      <InterestTable interests={interests} />
    </div>
  );
}