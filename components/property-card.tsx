import Image from "next/image";
import Link from "next/link";
import { PropertyType } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin } from "lucide-react";

interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  price: number;
  address: string;
  size: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number, type: PropertyType) => {
    return type === PropertyType.SHORT_STAY
      ? `$${price}/night`
      : type === PropertyType.SALE
      ? `$${price.toLocaleString()}`
      : `$${price.toLocaleString()}/month`;
  };

  const typeColors = {
    [PropertyType.RENTAL]: "bg-blue-100 text-blue-800",
    [PropertyType.SALE]: "bg-green-100 text-green-800",
    [PropertyType.LEASE]: "bg-purple-100 text-purple-800",
    [PropertyType.SHORT_STAY]: "bg-orange-100 text-orange-800",
  };

  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
          <Badge
            className={`absolute top-2 right-2 ${typeColors[property.type]}`}
            variant="secondary"
          >
            {property.type}
          </Badge>
        </div>
        
        <CardHeader>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm line-clamp-1">{property.address}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-bold">
            {formatPrice(property.price, property.type)}
          </p>
          <p className="text-muted-foreground line-clamp-2 mt-2">
            {property.description}
          </p>
        </CardContent>

        <CardFooter>
          <div className="flex items-center justify-between w-full text-muted-foreground">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.size} sqft</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}