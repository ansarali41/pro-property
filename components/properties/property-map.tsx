"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface PropertyMapProps {
  location?: { lat: number; lng: number };
}

export function PropertyMap({ location }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: "weekly",
        libraries: ["places", "marker"]
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current) {
          const mapCenter = location || { lat: 40.7128, lng: -74.0060 };
          const map = new google.maps.Map(mapRef.current, {
            center: mapCenter,
            zoom: 14,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          if (location) {
            new google.maps.Marker({
              position: location,
              map,
              animation: google.maps.Animation.DROP,
            });
          }
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [location]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg border"
      style={{ minHeight: "400px" }}
    />
  );
}