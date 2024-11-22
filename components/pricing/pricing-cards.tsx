"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe";
import { useToast } from "@/components/ui/use-toast";

export function PricingCards() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const onSubscribe = async (priceId: string) => {
    try {
      setIsLoading(priceId);
      
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
        <Card key={plan.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              Perfect for managing up to {plan.properties} properties
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-6">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => onSubscribe(plan.priceId)}
              disabled={!!isLoading}
            >
              {isLoading === plan.priceId ? "Loading..." : "Subscribe"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}