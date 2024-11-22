"use client";

import { useState } from "react";
import { addDays, format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface PropertyBookingProps {
  propertyId: string;
  pricePerNight: number;
  minStay?: number;
  maxStay?: number;
}

export function PropertyBooking({
  propertyId,
  pricePerNight,
  minStay = 1,
  maxStay = 30,
}: PropertyBookingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const { toast } = useToast();

  const numberOfNights = date.to
    ? differenceInDays(date.to, date.from)
    : 0;

  const totalPrice = numberOfNights * pricePerNight;
  const serviceFee = totalPrice * 0.12; // 12% service fee
  const totalWithFees = totalPrice + serviceFee;

  const handleBooking = async () => {
    if (!date.from || !date.to) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select check-in and check-out dates",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement booking API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking initiated",
        description: "You'll be redirected to complete your payment.",
      });
      
      // TODO: Redirect to payment/checkout
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create booking. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium">Dates</div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between">
            <span>
              ${pricePerNight} x {numberOfNights} nights
            </span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-4 font-medium">
            <span>Total</span>
            <span>${totalWithFees.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          size="lg"
          disabled={isLoading || !date.to}
          onClick={handleBooking}
        >
          {isLoading ? "Processing..." : "Book Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}