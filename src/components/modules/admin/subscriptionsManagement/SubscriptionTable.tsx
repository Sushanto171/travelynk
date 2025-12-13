"use client";

import { ManagementTable } from "@/components/shared/ManagementTable";
import { ISubscription } from "@/types/subscription.interface";
import { subscriptionColumn } from "./subscriptionColumn";

export default function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: ISubscription[];
}) {
  // const [subscription, setSubscription] = useState<ISubscription | null>(null);
  // const [deleteSubscription, setDeleteSubscription] =
  //   useState<ISubscription | null>(null);

  // const [isPending, startTransition] = useTransition();
  // const [isDeleting, setIsDeleting] = useState(false);

  // const router = useRouter();

  // const handleRefresh = () => {
  //   startTransition(() => {
  //     router.refresh();
  //   });
  // };

  // const handleConfirm = async () => {
  // if (!deleteSubscription?.id) return;
  // setIsDeleting(true);
  // const result = await deleteSubscriptionById(deleteSubscription.id);
  // if (result.success) {
  //   toast.success(result.message || "Subscription deleted successfully");
  //   handleRefresh();
  //   setDeleteSubscription(null);
  // } else {
  //   toast.error(result.message || "Failed to delete subscription");
  // }
  // setIsDeleting(false);
  // };

  return (
    <div>
      {/* 
        Future-ready:
        <SubscriptionCreateUpdateDialog
          open={!!subscription}
          subscription={subscription!}
          onClose={() => setSubscription(null)}
          onSuccess={handleRefresh}
        />
      */}
      {/* 
      <DeleteConfirmationDialog
        open={!!deleteSubscription}
        onConfirm={handleConfirm}
        onOpenChange={(open) => !open && setDeleteSubscription(null)}
        title="Delete Subscription"
        description={`Are you sure you want to delete this subscription? This action cannot be undone.`}
      /> */}

      <ManagementTable
        data={subscriptions}
        columns={subscriptionColumn}
        getRowKey={(row) => row.id!}
      // onDelete={setDeleteSubscription}
      // onEdit={setSubscription}
      // isRefreshing={isPending || isDeleting}
      />
    </div>
  );
}
