import SubscriptionsTable from "@/components/modules/admin/subscriptionsManagement/SubscriptionTable";
import { ManagementPageHeader } from "@/components/shared/ManagementPageHeader";
import { getSubscriptions } from "@/services/subscription/subscription.service";
import { Suspense } from "react";

export default async function AdminSubscriptionManagementPage() {

  const subscriptions = await getSubscriptions()
  return (
    <div>
      <Suspense fallback={null} >

        <ManagementPageHeader title="All Subscription"
          description="Manage subscriptions and update"
        />

        <SubscriptionsTable subscriptions={subscriptions?.data || []} />

      </Suspense>

    </div>
  );
}