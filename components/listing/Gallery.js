"use client";

import { useState } from "react";
import Image from "next/image";
import { Gallery as PhotoSwipeGallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

export default function Gallery({ images, projectName }) {
  // Ensure we always have 7 images by filling with placeholder
  const displayImages = [...images];
  while (displayImages.length < 7) {
    displayImages.push({
      id: `placeholder-${displayImages.length}`,
      images: "https://api.homebaba.ca/media/noimage.webp",
      imagealt: "no image available",
    });
  }

  return (
    <PhotoSwipeGallery>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 relative">
        {/* Main large image */}
        <Item
          original={displayImages[0].images}
          thumbnail={displayImages[0].images}
          width={1200}
          height={800}
        >
          {({ ref, open }) => (
            <div className="col-span-2 row-span-2 md:row-span-4 relative aspect-square h-[250px] md:h-[410px] w-full">
              <Image
                ref={ref}
                src={displayImages[0].images}
                alt={`${projectName} - Main View`}
                fill
                className="object-cover rounded-lg cursor-pointer"
                priority
                onClick={open}
              />
            </div>
          )}
        </Item>

        {/* Smaller images grid */}
        {displayImages.slice(1, 7).map((image, index) => (
          <Item
            key={image.id}
            original={image.images}
            thumbnail={image.images}
            width={1200}
            height={800}
          >
            {({ ref, open }) => (
              <div className="relative aspect-square h-[150px] md:h-[200px] w-full">
                <Image
                  ref={ref}
                  src={image.images}
                  alt={`${projectName} - View ${index + 2}`}
                  fill
                  className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
                  onClick={open}
                />
              </div>
            )}
          </Item>
        ))}
      </div>
    </PhotoSwipeGallery>
  );
}
