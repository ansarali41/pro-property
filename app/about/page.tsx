import { Building2, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About PropertyPro</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Transforming property management through innovative technology and exceptional service.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-muted-foreground">
            To simplify property management and create better experiences for property owners, tenants, and maintenance staff.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Team</h3>
          <p className="text-muted-foreground">
            A dedicated group of professionals committed to revolutionizing the property management industry.
          </p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-muted-foreground">
            Built on transparency, innovation, and a commitment to exceptional service.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <div className="prose prose-neutral dark:prose-invert">
          <p>
            Founded in 2024, PropertyPro emerged from a simple observation: property
            management shouldn't be complicated. We saw property owners struggling
            with outdated systems, tenants frustrated by poor communication, and
            maintenance staff juggling paper-based work orders.
          </p>
          <p>
            Today, we're proud to serve thousands of properties worldwide,
            continuously innovating and improving our platform to meet the evolving
            needs of the property management industry.
          </p>
          <p>
            Our platform brings together cutting-edge technology with user-friendly
            design, creating a seamless experience for all stakeholders in the
            property management ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}