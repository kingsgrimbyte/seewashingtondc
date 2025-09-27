"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PlaceImage } from "@/lib/types";

interface ImageGalleryProps {
  images: PlaceImage[];
  placeName: string;
}

export default function ImageGallery({ images, placeName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const validIndices = useMemo(
    () => images.map((_, i) => i).filter((i) => !imageErrors[i]),
    [images, imageErrors]
  );
  const hasAnyValid = images && images.length > 0 && validIndices.length > 0;

  const openModal = (index: number) => {
    if (imageErrors[index]) return; // don't open for broken images
    setSelectedIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const getNextValidIndex = (from: number, dir: 1 | -1): number | null => {
    if (!hasAnyValid) return null;
    let attempts = 0;
    let idx = from;
    const total = images.length;
    do {
      idx = (idx + dir + total) % total;
      attempts++;
      if (!imageErrors[idx]) return idx;
    } while (attempts < total);
    return null; // all failed
  };

  const goToNext = () => {
    if (selectedIndex === null) return;
    const next = getNextValidIndex(selectedIndex, 1);
    if (next !== null) setSelectedIndex(next);
  };

  const goToPrevious = () => {
    if (selectedIndex === null) return;
    const prev = getNextValidIndex(selectedIndex, -1);
    if (prev !== null) setSelectedIndex(prev);
  };

  // Keyboard navigation (modal only)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isModalOpen) return;
    if (e.key === "ArrowRight") goToNext();
    else if (e.key === "ArrowLeft") goToPrevious();
    else if (e.key === "Escape") closeModal();
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const next = { ...prev, [index]: true };

      // If the currently open image failed, move to the next valid image or close
      if (isModalOpen && selectedIndex === index) {
        const hop = getNextValidIndex(index, 1) ?? getNextValidIndex(index, -1);
        if (hop !== null) {
          setSelectedIndex(hop);
        } else {
          // no valid images left; close modal
          setSelectedIndex(null);
          setIsModalOpen(false);
          document.body.style.overflow = "auto";
        }
      }

      return next;
    });
  };

  const getImageUrl = (image: PlaceImage) => {
    let imageUrl = image.image_url;

    // Google URLs normalization
    if (imageUrl.includes("googleusercontent.com")) {
      if (!imageUrl.includes("=w") || !imageUrl.includes("-h")) {
        imageUrl = imageUrl.replace(/\?.*$/, "") + "=w1280-h600-no";
      } else {
        imageUrl = imageUrl.replace(/w\d+-h\d+(-k)?-no/, "w1280-h600-no");
      }
    }

    // gps-proxy fallback
    if (imageUrl.includes("gps-proxy")) {
      return "https://images.pexels.com/photos/2079438/pexels-photo-2079438.jpeg";
    }

    return imageUrl;
  };

  // If no images or all broken → render a single placeholder and bail
  if (!hasAnyValid) {
    return (
      <div className="w-full h-40 md:h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Image not available</span>
      </div>
    );
  }

  return (
    <>
      {/* Horizontal scrolling gallery */}
      <div
        className="flex overflow-x-auto pb-4 space-x-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ scrollbarWidth: "thin" }}
      >
        {images.map((image, index) => {
          if (imageErrors[index]) return null; // hide errored thumbnails entirely

          const imageUrl = getImageUrl(image);

          return (
            <div
              key={index}
              className="flex-none w-56 h-40 md:w-72 md:h-48 relative rounded-lg overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openModal(index)}
            >
              <Image
                src={imageUrl}
                alt={image.alt_text || `${placeName} image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="object-cover"
                onError={() => handleImageError(index)}
                priority={index < 3}
              />
            </div>
          );
        })}
      </div>

      {/* Image Carousel Modal */}
      {isModalOpen && selectedIndex !== null && !imageErrors[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeModal}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(images[selectedIndex])}
                alt={images[selectedIndex].alt_text || `${placeName} image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
                onError={() => handleImageError(selectedIndex)}
              />
            </div>

            {/* Navigation arrows */}
            {validIndices.length > 1 && (
              <>
                <button
                  className="absolute left-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  className="absolute right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <span className="px-4 py-1 bg-black/50 rounded-full text-sm">
                {validIndices.indexOf(selectedIndex) + 1} / {validIndices.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
