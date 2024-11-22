"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyAvailabilityProps {
  bookedDates?: Date[];
}

export function PropertyAvailability({ bookedDates = [] }: PropertyAvailabilityProps) {
  const disabledDates = [
    ...bookedDates,
    ...Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    }),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          disabled={(date) =>
            date < new Date() ||
            disabledDates.some(
              (bookedDate) =>
                bookedDate.toDateString() === date.toDateString()
            )
          }
          className="rounded-md"
          numberOfMonths={2}
        />
      </CardContent>
    </Card>
  );
}