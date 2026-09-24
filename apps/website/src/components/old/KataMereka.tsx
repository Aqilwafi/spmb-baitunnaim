"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials, Testimonial } from "@bn/constants";
import { CompanyLogo } from "@bn/ui";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.9,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.9,
  }),
}

const swipeConfidenceThreshold = 80
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity

export default function KataMereka() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0])
  const [isHover, setIsHover] = useState(false)

  const paginate = (dir: number) => {
    setActive(([prev]) => [
      (prev + dir + testimonials.length) % testimonials.length,
      dir,
    ])
  }

  return (
    <section
      className="py-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="container mx-auto px-4 text-center">

        {/* Judul & Divider diperkecil jarak bawahnya */}
        <h2 className="text-lg md:text-2xl font-bold mb-1 text-green-800">
          Kata Mereka
        </h2>
        <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full"></div>

        {/* Min-height dikurangi agar tidak ada ruang kosong berlebih */}
        <div className="relative w-full max-w-2xl mx-auto min-h-[320px] flex justify-center items-center select-none px-4">

          {/* LEFT ARROW */}
          <motion.button
            onClick={() => paginate(-1)}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHover ? 1 : 0,
              x: isHover ? 0 : 20,
            }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex absolute left-0 z-20 bg-white text-teal-800 rounded-full p-3 shadow-lg hover:bg-teal-50 cursor-pointer items-center justify-center -translate-x-1/2"
          >
            ←
          </motion.button>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute w-full flex justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.75}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) paginate(1)
                else if (swipe > swipeConfidenceThreshold) paginate(-1)
              }}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* RIGHT ARROW */}
          <motion.button
            onClick={() => paginate(1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHover ? 1 : 0,
              x: isHover ? 0 : -20,
            }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex absolute right-0 z-20 bg-white text-teal-800 rounded-full p-3 shadow-lg hover:bg-teal-50 cursor-pointer items-center justify-center translate-x-1/2"
          >
            →
          </motion.button>

        </div>

      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col items-center w-full max-w-md md:max-w-lg cursor-grab active:cursor-grabbing px-2">

      {/* Logo Container dengan margin negatif yang disesuaikan */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-full border-4 border-white bg-white shadow-md mb-[-2.5rem] z-10 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center p-2.5 overflow-hidden"
      >
        <CompanyLogo />
      </motion.div>

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-gradient-to-br from-green-800 to-green-700 text-white pt-14 pb-6 px-6 md:px-10 rounded-2xl shadow-xl w-full"
      >
        <p className="text-xs md:text-sm italic mb-4 text-center leading-relaxed">
          "{testimonial.description}"
        </p>
        <h3 className="font-bold text-sm md:text-base text-center">{testimonial.name}</h3>
        <p className="text-[11px] md:text-xs opacity-80 text-center mt-0.5">
          {testimonial.title}
        </p>
      </motion.div>

    </div>
  )
}