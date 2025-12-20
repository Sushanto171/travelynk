"use client";

import { ManagementTable } from "@/components/shared/ManagementTable";
import { ISubscription } from "@/types/subscription.interface";
import { useState } from "react";
import { subscriptionColumn } from "./subscriptionColumn";
import SubscriptionViewDetailsModal from "./SubscriptionViewModal";

export default function SubscriptionsTable({
  subscriptions,
}: {
  subscriptions: ISubscription[];
}) {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);

  const handleClose = () => {
    setSubscription(null);
  };

  return (
    <div>
      {subscription && (
        <SubscriptionViewDetailsModal
          open={true}
          subscription={subscription}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          onClose={handleClose}
        />
      )}

      <ManagementTable
        data={subscriptions}
        columns={subscriptionColumn}
        getRowKey={(row) => row.id!}
        onView={(row) => setSubscription(row)}
      />
    </div>
  );
}
