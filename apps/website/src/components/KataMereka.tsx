"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials,Testimonial } from "@/const/testimonial"

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
      className="py-10 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="container mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">
          Kata Mereka
        </h2>
        <div className="w-180 h-0.5 bg-teal-600 mx-auto mb-2"></div>

        <div className="relative w-full max-w-xl mx-auto min-h-[420px] flex justify-center items-center select-none">

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="absolute"
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

          {/* LEFT ARROW */}
          <motion.button
            onClick={() => paginate(-1)}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHover ? 1 : 0,
              x: isHover ? 0 : 20,
            }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex absolute -left-16 z-20 bg-white rounded-full p-3 shadow-xl hover:bg-teal-50"
          >
            ←
          </motion.button>

          {/* RIGHT ARROW */}
          <motion.button
            onClick={() => paginate(1)}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isHover ? 1 : 0,
              x: isHover ? 0 : -20,
            }}
            transition={{ duration: 0.25 }}
            className="hidden md:flex absolute -right-16 z-20 bg-white rounded-full p-3 shadow-xl hover:bg-teal-50"
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
    <div className="flex flex-col items-center w-80 md:w-[420px] cursor-grab active:cursor-grabbing">

      <motion.img
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        src={testimonial.imageUrl}
        className="rounded-full border-4 border-white object-cover shadow-lg mb-4 w-28 h-28 md:w-32 md:h-32"
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="bg-gradient-to-br from-green-800 to-green-700 text-white p-8 rounded-2xl shadow-lg"
      >
        <p className="italic mb-4 text-center">
          "{testimonial.description}"
        </p>
        <h3 className="font-bold text-center">{testimonial.name}</h3>
        <p className="text-sm opacity-80 text-center mt-1">
          {testimonial.title}
        </p>
      </motion.div>

    </div>
  )
}
