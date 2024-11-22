"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PropertyType } from "@/lib/types";

interface PropertyContactProps {
  propertyId: string;
  propertyTitle: string;
  propertyType?: PropertyType;
  price?: number;
  hoaFee?: number;
  taxAmount?: number;
}

export function PropertyContact({
  propertyId,
  propertyTitle,
  propertyType,
  price,
  hoaFee,
  taxAmount,
}: PropertyContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Implement contact form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate estimated monthly payment (simple calculation for demo)
  const calculateMonthlyPayment = () => {
    if (!price) return null;
    
    const downPayment = price * 0.20; // 20% down payment
    const loanAmount = price - downPayment;
    const interestRate = 0.045; // 4.5% annual interest rate
    const loanTermYears = 30;
    
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTermYears * 12;
    
    const monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    const monthlyTax = taxAmount ? taxAmount / 12 : 0;
    const monthlyHOA = hoaFee || 0;
    
    return {
      mortgage: monthlyPayment,
      tax: monthlyTax,
      hoa: monthlyHOA,
      total: monthlyPayment + monthlyTax + monthlyHOA,
    };
  };

  const monthlyPayment = propertyType === PropertyType.SALE ? calculateMonthlyPayment() : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
      </CardHeader>
      <CardContent>
        {monthlyPayment && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Est. Monthly Payment</span>
              <span className="font-semibold">${Math.round(monthlyPayment.total).toLocaleString()}</span>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Principal & Interest</span>
                <span>${Math.round(monthlyPayment.mortgage).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Property Tax</span>
                <span>${Math.round(monthlyPayment.tax).toLocaleString()}</span>
              </div>
              {monthlyPayment.hoa > 0 && (
                <div className="flex justify-between">
                  <span>HOA Fee</span>
                  <span>${monthlyPayment.hoa}</span>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate with Down Payment
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
          </div>
          <Input type="tel" placeholder="Your Phone (optional)" />
          <div className="flex items-center space-x-4">
            <Button type="button" variant="outline" className="flex-1">
              <Phone className="mr-2 h-4 w-4" />
              Call Agent
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Tour
            </Button>
          </div>
          <Textarea 
            placeholder="I'm interested in this property..." 
            className="min-h-[100px]"
            required
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Mail className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        By submitting, you agree to our terms of service and privacy policy.
      </CardFooter>
    </Card>
  );
}