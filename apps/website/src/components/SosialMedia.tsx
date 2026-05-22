"use client"

import { socials } from "@/const/sosmed"

export default function SocialMedia() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto text-center">

        {/* JUDUL */}
        <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
          Sosial Media
        </h2>

        {/* GARIS */}
        <div className="w-180 h-0.5 bg-teal-600 mx-auto mb-10"></div>

        {/* LOGO LIST */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 p-2">

          {socials.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-white shadow hover:shadow-lg transition">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain invert-0"
                />
              </div>

              <span className="text-sm md:text-base font-medium text-gray-700">
                {item.name}
              </span>
            </a>
          ))}

        </div>
      </div>
    </section>
  )
}
