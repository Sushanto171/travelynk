"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface User {
  id: string;
  name: string;
  email: string;
  profile_photo?: string | null;
}

export function RecentUsersTable({ users }: { users: User[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center justify-between rounded-md p-2 hover:bg-muted/30 transition border"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                {user.profile_photo ? (
                  <AvatarImage src={user.profile_photo} alt={user.name} />
                ) : (
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                )}
              </Avatar>
              <span className="font-medium">{user.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </motion.div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            No recent users found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
