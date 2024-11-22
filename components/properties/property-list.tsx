"use client";

import { useState } from "react";
import { PropertyCard } from "@/components/property-card";
import { PropertyType } from "@/lib/types";

// Mock data - replace with API call
const properties = [
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
    location: { lat: 40.7128, lng: -74.0060 }
  },
  // Add more properties...
];

export function PropertyList() {
  const [sortBy, setSortBy] = useState("price-asc");

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}