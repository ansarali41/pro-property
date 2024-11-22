import { PropertySearch } from '@/components/property-search';
import { FeaturedProperties } from '@/components/featured-properties';
import { HeroSection } from '@/components/hero-section';

export default function Home() {
  return (
    <div className="space-y-12 pb-8">
      <HeroSection />
      <PropertySearch />
      <FeaturedProperties />
    </div>
  );
}