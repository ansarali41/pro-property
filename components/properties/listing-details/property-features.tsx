import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Features & Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}