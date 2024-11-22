"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const mockTenants = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    property: "123 Main St, Apt 4B",
    moveIn: "2024-01-15",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    property: "456 Oak Ave",
    moveIn: "2024-02-01",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    property: "789 Pine St",
    moveIn: "2024-02-15",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export function RecentTenants() {
  return (
    <div className="space-y-4">
      {mockTenants.map((tenant) => (
        <Card key={tenant.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={tenant.image} alt={tenant.name} />
                <AvatarFallback>{tenant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{tenant.name}</p>
                <p className="text-sm text-muted-foreground">{tenant.property}</p>
                <p className="text-xs text-muted-foreground">Move-in: {tenant.moveIn}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}