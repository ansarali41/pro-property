import { PricingCards } from "@/components/pricing/pricing-cards";

export default function PricingPage() {
  return (
    <div className="container max-w-6xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the perfect plan for your property management needs
        </p>
      </div>
      <PricingCards />
    </div>
  );
}