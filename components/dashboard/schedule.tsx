"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const mockSchedule = [
  {
    id: "1",
    time: "09:00 AM",
    title: "Fix Leaking Faucet",
    location: "123 Main St, Apt 4B",
  },
  {
    id: "2",
    time: "11:30 AM",
    title: "AC Maintenance",
    location: "456 Oak Ave",
  },
  {
    id: "3",
    time: "02:00 PM",
    title: "Replace Light Fixtures",
    location: "789 Pine St",
  },
];

export function Schedule() {
  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        className="rounded-md border"
      />
      <div className="space-y-4">
        {mockSchedule.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {item.time}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.location}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}