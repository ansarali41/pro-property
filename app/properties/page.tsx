import { PropertyList } from "@/components/properties/property-list";
import { PropertyMap } from "@/components/properties/property-map";
import { PropertyFilters } from "@/components/properties/property-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PropertiesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>
      
      <PropertyFilters />

      <Tabs defaultValue="list" className="mt-8">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-6">
          <PropertyList />
        </TabsContent>
        <TabsContent value="map" className="mt-6">
          <PropertyMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}