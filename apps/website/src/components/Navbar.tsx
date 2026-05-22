"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { links, lembagaLinks } from "@/const/links";

export default function Navbar({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [lembagaOpen, setLembagaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname() || "/";
  const isActive = (href?: string) => href && pathname === href;

  // === SCROLL LISTENER ===
  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  // === STYLE DINAMIS ===
  const activeStyle = transparent
    ? scrolled
      ? "bg-white shadow-md text-black"
      : "bg-transparent text-white"
    : "bg-white shadow-md text-black";

  const dropdownBg = transparent && !scrolled ? "bg-white/90 text-black" : "bg-white text-black";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${activeStyle}`}>
      <div className="container max-w-full mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/logo_lpi.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span
            className={`font-bold tracking-wide text-base sm:text-lg md:text-xl ${
              transparent && !scrolled ? "text-white" : "text-teal-800"
            }`}
          >
            Baitun Na'im Full Day School
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) =>
            link.isDropdown ? (
              <div
                key="lembaga"
                className="relative"
                onMouseEnter={() => setLembagaOpen(true)}
                onMouseLeave={() => setLembagaOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-2 py-1 cursor-pointer ${
                    lembagaLinks.some((l) => pathname === l.href)
                      ? "bg-teal-800 text-white"
                      : transparent && !scrolled
                      ? "text-white hover:bg-white/20"
                      : "hover:bg-teal-100 text-black"
                  }`}
                >
                  LEMBAGA <ChevronDown size={14} />
                </button>

                {lembagaOpen && (
                  <div
                    className={`absolute top-full left-0 border border-gray-200 shadow-md mt-1 z-50 w-36 ${dropdownBg}`}
                  >
                    {lembagaLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href!}
                        className={`block px-2 py-1 hover:bg-teal-100 ${
                          isActive(item.href) ? "bg-teal-800 text-white" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2 py-1 ${
                  isActive(link.href)
                    ? "bg-teal-800 text-white"
                    : transparent && !scrolled
                    ? "text-white hover:bg-white/20"
                    : "hover:bg-teal-100 text-black"
                } whitespace-nowrap`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href!}
                className={`px-2 py-1 ${
                  isActive(link.href)
                    ? "bg-teal-800 text-white"
                    : transparent && !scrolled
                    ? "text-white hover:bg-white/20"
                    : "hover:bg-teal-100 text-black"
                } whitespace-nowrap`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center cursor-pointer"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={`md:hidden px-4 py-3 space-y-1 transition-all duration-300 ${
            scrolled || !transparent
              ? "bg-white text-black shadow-md"
              : "bg-black/70 text-white backdrop-blur-sm"
          }`}
        >
          {[...links, ...lembagaLinks]
            .filter((link) => !link.isDropdown)
            .map((link) =>
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-2 py-1 ${
                    isActive(link.href) ? "bg-teal-800 text-white" : "hover:bg-teal-100"
                  } whitespace-nowrap`}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={`block px-2 py-1 ${
                    isActive(link.href) ? "bg-teal-800 text-white" : "hover:bg-teal-100"
                  } whitespace-nowrap`}
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
        </div>
      )}
    </nav>
  );
}
