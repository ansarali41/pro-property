"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-4">
        <div 
          className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
          onClick={() => setSelectedImage(images[0])}
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-video overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${title} - Image ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <div className="relative aspect-video">
            <Image
              src={selectedImage || images[0]}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}