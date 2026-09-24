"use client";

import { heroimages } from "@bn/constants";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroimages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full aspect-[2/1] md:aspect-[2/1] md:max-h-screen overflow-hidden bg-white">

      {/* Slide Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center">
        {heroimages.map((img, i) => (
          <div
            key={i}
            className={[
              "absolute inset-0 w-full h-full flex items-center justify-center",
              "transition-opacity duration-[1200ms]",
              i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            ].join(" ")}
          >
            <Image
              src={img}
              alt={`Hero Image ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay: keeps the transparent navbar's white text readable
          against bright hero photos, regardless of which slide is showing */}
      <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-black/40 to-transparent z-20 pointer-events-none" />

      {/* Slide indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {heroimages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              i === currentIndex ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>

      {/* dimatikan dulu */}
      {/* CTA Button */}
      {/* <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute right-3 bottom-3 sm:right-6 sm:bottom-10 lg:right-6 lg:bottom-6 pointer-events-auto">
          <a
            href={process.env.NEXT_PUBLIC_SPMB_URL ?? "/"}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block bg-yellow-500 text-teal-800 font-semibold font-poppins rounded-full
              transition duration-300 hover:bg-yellow-400 hover:shadow-md
              text-[8px] sm:text-[10px] md:text-[20px] lg:text-[24px]
              px-2 sm:px-6 md:px-3 lg:px-8
              py-0.5 sm:py-1.5 md:py-1 lg:py-1.5
            "
          >
            Daftar Sekarang
          </a>
        </div>
      </div> */}

    </section>
  );
}