"use client";

import { UserCard } from "@/components/shared/UserCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatAmountCentToTaka } from "@/lib/formatters";
import { ISubscription } from "@/types/subscription.interface";

interface SubscriptionViewDetailsModalProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange: (open: boolean) => void;
  subscription: ISubscription
}

export default function SubscriptionViewDetailsModal({
  open,
  onClose,
  onOpenChange,
  subscription,
}: SubscriptionViewDetailsModalProps) {
  const {
    plan_type,
    payment_status,
    is_active,
    start_date,
    end_date,
    subscriber,
    payments,
  } = subscription;

  const latestPayment = payments?.[0];

  console.log(subscription);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open && onClose) onClose();
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Subscription Details
          </DialogTitle>
        </DialogHeader>

        {/* Subscriber Info */}
        <section className="space-y-1">
          <p className="text-sm text-muted-foreground">Subscriber</p>

          <UserCard id={subscriber.id} name={subscriber.name} email={subscriber.email} profile_photo={subscriber.profile_photo}
          />
        </section>

        <Separator />

        {/* Plan Info */}
        <section className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Plan Type</p>
            <Badge variant="outline">{plan_type}</Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge variant={is_active ? "default" : "secondary"}>
              {is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Start Date</p>
            <p>{new Date(start_date).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-muted-foreground">End Date</p>
            <p>{new Date(end_date).toLocaleDateString()}</p>
          </div>
        </section>

        <Separator />

        {/* Payment Info */}
        <section className="space-y-2">
          <p className="text-sm font-medium">Payment</p>

          {latestPayment ? (
            <div className="rounded-lg border p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">
                  ৳{formatAmountCentToTaka(latestPayment.amount)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={
                    payment_status === "PAID" ? "default" : "destructive"
                  }
                >
                  {payment_status}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="truncate max-w-[220px]">
                  {latestPayment.transactionId}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No payment record found.
            </p>
          )}
        </section>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
