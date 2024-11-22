"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyType } from "@/lib/types";

export function PropertySearch() {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.RENTAL);
  const [priceRange, setPriceRange] = useState("all");

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log({ location, propertyType, priceRange });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-card rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Find Your Perfect Property</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9"
              />
            </div>

            <div>
              <Select value={propertyType} onValueChange={(value: PropertyType) => setPropertyType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PropertyType.RENTAL}>Rental</SelectItem>
                  <SelectItem value={PropertyType.SALE}>Sale</SelectItem>
                  <SelectItem value={PropertyType.LEASE}>Lease</SelectItem>
                  <SelectItem value={PropertyType.SHORT_STAY}>Short Stay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                  <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                  <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
                  <SelectItem value="3000+">$3,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSearch} className="w-full">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}