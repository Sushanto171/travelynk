import SubscriptionsTable from "@/components/modules/admin/subscriptionsManagement/SubscriptionTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { getSubscriptions } from "@/services/subscription/subscription.service";
import { Suspense } from "react";

export default async function AdminSubscriptionManagementPage() {

  const subscriptions = await getSubscriptions()
  return (
    <div className={"space-y-6"}>
      <Suspense fallback={<TableSkeleton showActions />} >

        <ManagementPageHeader title="All Subscription"
          description="Manage subscriptions and update"
        />

        <SubscriptionsTable subscriptions={subscriptions?.data || []} />

      </Suspense>

    </div>
  );
}