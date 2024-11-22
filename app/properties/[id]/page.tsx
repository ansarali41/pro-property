import { notFound } from "next/navigation";
import { PropertyGallery } from "@/components/properties/listing-details/property-gallery";
import { PropertyFeatures } from "@/components/properties/listing-details/property-features";
import { PropertyInfo } from "@/components/properties/listing-details/property-info";
import { PropertyContact } from "@/components/properties/listing-details/property-contact";
import { PropertyDetails } from "@/components/properties/listing-details/property-details";
import { PropertyMap } from "@/components/properties/property-map";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/lib/types";

// Mock data - replace with actual data fetching
const getProperty = async (id: string) => {
  // Simulated property data
  return {
    id,
    title: "Elegant Modern Family Home",
    description: "Stunning contemporary home featuring open-concept living, gourmet kitchen, and resort-style backyard. Perfect for families seeking luxury and comfort in a prime location.",
    type: PropertyType.SALE,
    price: 1250000,
    address: "456 Maple Avenue, Beverly Hills, CA",
    size: 3800,
    bedrooms: 4,
    bathrooms: 3.5,
    yearBuilt: 2020,
    propertyType: "Single Family Home",
    lotSize: "0.35 acres",
    parkingSpaces: 2,
    features: [
      "Gourmet Kitchen",
      "Smart Home System",
      "Home Theater",
      "Wine Cellar",
      "Custom Closets",
      "Hardwood Floors",
      "Central AC/Heat",
      "Solar Panels",
      "Security System",
      "Outdoor Kitchen",
      "Pool & Spa",
      "Landscaped Garden"
    ],
    details: {
      interior: {
        appliances: ["Sub-Zero Refrigerator", "Wolf Range", "Miele Dishwasher"],
        flooring: ["Hardwood", "Marble", "Porcelain Tile"],
        heating: "Forced Air, Radiant Floor",
        cooling: "Central Air",
        basement: "Finished, Walkout",
        windows: "Double-Pane, Energy Efficient"
      },
      exterior: {
        roof: "Slate",
        construction: "Brick & Stone",
        foundation: "Concrete",
        garage: "2-Car Attached",
        driveway: "Paved",
        lot: "Landscaped, Fenced"
      },
      utilities: {
        water: "Municipal",
        sewer: "Municipal",
        electricity: "Underground",
        internet: "Fiber Optic"
      },
      financial: {
        taxYear: 2023,
        taxAmount: 12500,
        hoaFee: 250,
        hoaFrequency: "monthly"
      }
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
    ],
    location: { lat: 34.0736, lng: -118.4004 }
  };
};

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number, type: PropertyType) => {
    return type === PropertyType.SHORT_STAY
      ? `$${price}/night`
      : type === PropertyType.SALE
      ? `$${price.toLocaleString()}`
      : `$${price.toLocaleString()}/month`;
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatPrice(property.price, property.type)}
            </div>
            <Badge variant="secondary" className="mt-1">
              {property.type}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <PropertyGallery images={property.images} title={property.title} />
          
          <PropertyInfo
            type={property.type}
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            size={property.size}
            yearBuilt={property.yearBuilt}
            propertyType={property.propertyType}
            lotSize={property.lotSize}
            parkingSpaces={property.parkingSpaces}
          />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          <PropertyFeatures features={property.features} />

          <PropertyDetails details={property.details} />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Location</h2>
            <PropertyMap location={property.location} />
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <PropertyContact
              propertyId={property.id}
              propertyTitle={property.title}
              propertyType={PropertyType.SALE}
              price={property.price}
              hoaFee={property.details.financial.hoaFee}
              taxAmount={property.details.financial.taxAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}