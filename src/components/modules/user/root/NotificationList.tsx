import { Card, CardContent } from "@/components/ui/card";

interface NotificationItemProps {
  type: string;
  message: string;
  timestamp: string;
}

export function NotificationItem({ message, timestamp }: NotificationItemProps) {
  return (
    <Card className="p-3 mb-2">
      <CardContent className="flex justify-between items-center">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </CardContent>
    </Card>
  );
}

interface NotificationsListProps {
  notifications: NotificationItemProps[];
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  return <div>{notifications.map((n, i) => <NotificationItem key={i} {...n} />)}</div>;
}
