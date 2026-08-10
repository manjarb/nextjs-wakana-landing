"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

type SanctuarySlide = {
  src: string;
  alt: string;
  label: string;
};

const slides: SanctuarySlide[] = [
  {
    src: "/images/sanctuary_preview/front.png",
    alt: "WANAKA Sanctuary storefront entrance",
    label: "Sanctuary Entrance",
  },
  {
    src: "/images/sanctuary_preview/middle_3.png",
    alt: "Reception desk and welcoming lounge inside WANAKA Sanctuary",
    label: "Reception Lounge",
  },
  {
    src: "/images/sanctuary_preview/middle_1.png",
    alt: "Arched wood corridor leading through the sanctuary",
    label: "Sanctuary Corridor",
  },
  {
    src: "/images/sanctuary_preview/middle_2.png",
    alt: "Wanaka-branded lounge seating with mirror arches",
    label: "Wanaka Lounge",
  },
  {
    src: "/images/sanctuary_preview/middle_4.png",
    alt: "Wellness corner with product shelving and mural arch",
    label: "Wellness Corner",
  },
  {
    src: "/images/sanctuary_preview/consult_room.png",
    alt: "Private consultation room with treatment chair",
    label: "Consultation Room",
  },
  {
    src: "/images/sanctuary_preview/wanaka_room.png",
    alt: "Twin treatment beds in a WANAKA treatment suite",
    label: "Treatment Suite",
  },
  {
    src: "/images/sanctuary_preview/vip_room.png",
    alt: "VIP relaxation room with reclining chairs facing the garden",
    label: "VIP Relaxation Room",
  },
  {
    src: "/images/sanctuary_preview/vip2.png",
    alt: "VIP lounge sofa beneath the WANAKA mural wall",
    label: "VIP Lounge",
  },
];

export default function SanctuaryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="mt-12">
      <div className="relative">
        <div className="overflow-hidden rounded-[32px]" ref={emblaRef}>
          <div className="-ml-4 flex">
            {slides.map((slide) => (
              <div
                key={slide.src}
                className="relative min-w-0 flex-[0_0_100%] pl-4 sm:flex-[0_0_33.333333%]"
              >
                <div className="relative h-80 border border-white/50 bg-white/60 shadow-lg shadow-[#d6c8b2]/30 sm:h-96">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 100vw"
                    loading="eager"
                    priority={slide === slides[0]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f3a36]/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-lg font-semibold">{slide.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2f3a36] shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#2f3a36] shadow-md transition hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex
                ? "w-6 bg-[#5b6d65]"
                : "w-2.5 bg-[#c2b8a3] hover:bg-[#a99f8c]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
