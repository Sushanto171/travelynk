import { Inbox } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function EmptyMassage({ text }: { text: string }) {
  return (
    <Card className="py-16 border-dashed shadow-none text-center">
      <CardContent className="space-y-4">
        <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
        <div className="text-lg font-semibold text-gray-900">
          {text}
        </div>
      </CardContent>
    </Card>
  );
}