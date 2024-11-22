import { Building2, Key, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Modern Property Management Made Simple
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline your property management with our all-in-one platform. Perfect for property owners,
            tenants, and maintenance staff.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/properties">
              <Button size="lg">
                Browse Properties
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Property Management</h3>
              <p className="mt-2 text-muted-foreground">
                Easily manage your properties, tenants, and maintenance requests in one place.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Tenant Portal</h3>
              <p className="mt-2 text-muted-foreground">
                Give your tenants a modern platform to pay rent and submit maintenance requests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Secure & Reliable</h3>
              <p className="mt-2 text-muted-foreground">
                Built with enterprise-grade security to protect your data and transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}