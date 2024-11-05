"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({ images, projectName }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Ensure we always have 7 images by filling with placeholder
  const displayImages = [...images];
  while (displayImages.length < 7) {
    displayImages.push({
      id: `placeholder-${displayImages.length}`,
      images: "https://api.homebaba.ca/media/noimage.webp",
      imagealt: "no image available",
    });
  }

  const handlePrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="grid grid-cols-5 gap-2 relative">
      {/* Main large image */}
      <div className="col-span-2 row-span-4 relative aspect-square h-[410px] w-full">
        <Image
          src={displayImages[0].images}
          alt={`${projectName} - Main View`}
          fill
          className="object-cover rounded-lg cursor-pointer"
          onClick={() => setSelectedImageIndex(0)}
          priority
        />
      </div>

      {/* Smaller images grid */}
      {displayImages.slice(1, 7).map((image, index) => (
        <div key={image.id} className="relative aspect-square h-[200px] w-full">
          <Image
            src={image.images}
            alt={`${projectName} - View ${index + 2}`}
            fill
            className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
            onClick={() => setSelectedImageIndex(index + 1)}
          />
        </div>
      ))}

      {/* Lightbox Dialog with Navigation */}
      <Dialog
        open={selectedImageIndex !== null}
        onOpenChange={() => setSelectedImageIndex(null)}
      >
        <DialogContent className="max-w-5xl">
          <div className="relative aspect-video">
            <Image
              src={displayImages[selectedImageIndex]?.images || ""}
              alt={displayImages[selectedImageIndex]?.imagealt || ""}
              fill
              className="object-contain"
            />

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/75 transition"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
