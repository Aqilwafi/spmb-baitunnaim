"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { sublinks } from "@/const/links";

export default function Navbar2() {
  const [active, setActive] = useState("Berita");
  const [open, setOpen] = useState(false);

  const linkClass = "px-3 py-1 rounded-full transition";

  return (
    <nav className="bg-white border border-yellow-100 shadow-sm fixed w-full z-50">
      <div className="container max-w-full mx-auto px-6 md:px-12 py-3 md:py-4 flex justify-between items-center">
        {/* Logo & text kiri */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_lpi.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span className="font-bold tracking-wide text-base sm:text-lg md:text-xl text-teal-800">
            Baitun Na'im Full Day School
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex text-teal-800 font-medium space-x-2">
          {sublinks.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`${linkClass} ${
                active === link ? "bg-teal-800 text-white" : "hover:bg-teal-100"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white text-teal-800 border-t border-yellow-100 px-6 py-4 space-y-2 shadow-md">
          {sublinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActive(link);
                setOpen(false);
              }}
              className={`${linkClass} w-full text-left ${
                active === link ? "bg-teal-800 text-white" : "hover:bg-teal-100"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
