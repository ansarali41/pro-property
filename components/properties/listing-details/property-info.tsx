import { Bed, Bath, Square, Calendar, Home, Car, Ruler } from "lucide-react";
import { PropertyType } from "@/lib/types";

interface PropertyInfoProps {
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  size: number;
  yearBuilt: number;
  propertyType: string;
  lotSize?: string;
  parkingSpaces?: number;
}

export function PropertyInfo({
  type,
  bedrooms,
  bathrooms,
  size,
  yearBuilt,
  propertyType,
  lotSize,
  parkingSpaces,
}: PropertyInfoProps) {
  const items = [
    {
      icon: Bed,
      label: `${bedrooms} Bedrooms`,
    },
    {
      icon: Bath,
      label: `${bathrooms} Bathrooms`,
    },
    {
      icon: Square,
      label: `${size.toLocaleString()} sqft`,
    },
    {
      icon: Calendar,
      label: `Built ${yearBuilt}`,
    },
    {
      icon: Home,
      label: propertyType,
    },
  ];

  if (type === PropertyType.SALE) {
    if (lotSize) {
      items.push({
        icon: Ruler,
        label: `Lot: ${lotSize}`,
      });
    }
    if (parkingSpaces) {
      items.push({
        icon: Car,
        label: `${parkingSpaces} Parking`,
      });
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 bg-muted/50 rounded-lg">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center justify-center p-3">
          <Icon className="h-5 w-5 mb-2 text-muted-foreground" />
          <span className="text-sm font-medium text-center">{label}</span>
        </div>
      ))}
    </div>
  );
}