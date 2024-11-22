import { PropertyCard } from "@/components/property-card";
import { PropertyType } from "@/lib/types";

// Mock data for featured properties
const featuredProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    description: "Luxurious 2-bedroom apartment with city views",
    type: PropertyType.RENTAL,
    price: 2500,
    address: "123 Main St, New York, NY",
    size: 1200,
    bedrooms: 2,
    bathrooms: 2,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "2",
    title: "Suburban Family Home",
    description: "Spacious 4-bedroom house with large backyard",
    type: PropertyType.SALE,
    price: 750000,
    address: "456 Oak Ave, Los Angeles, CA",
    size: 2800,
    bedrooms: 4,
    bathrooms: 3,
    images: ["https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "3",
    title: "Beachfront Condo",
    description: "Beautiful 1-bedroom condo with ocean views",
    type: PropertyType.SHORT_STAY,
    price: 200,
    address: "789 Beach Rd, Miami, FL",
    size: 800,
    bedrooms: 1,
    bathrooms: 1,
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
  },
];

export function FeaturedProperties() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Featured Properties</h2>
          <p className="text-muted-foreground mt-2">
            Discover our hand-picked selection of premium properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}