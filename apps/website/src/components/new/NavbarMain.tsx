"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { links, lembagaLinks } from "@bn/constants";
import { CompanyLogo } from "@bn/ui";

export default function NavbarMain({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [lembagaOpen, setLembagaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // === CLOSE DROPDOWN ON OUTSIDE CLICK ===
  useEffect(() => {
    if (!lembagaOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLembagaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [lembagaOpen]);

  // === CLOSE MENUS ON ROUTE CHANGE ===
  useEffect(() => {
    setOpen(false);
    setLembagaOpen(false);
  }, [pathname]);

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
          <CompanyLogo />
          <span
            className={`font-bold tracking-wide text-base sm:text-lg md:text-xl transition-colors duration-300 ${
              transparent && !scrolled ? "text-white" : "text-teal-800"
            }`}
          >
            Baitun Na&apos;im Full Day School
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) =>
            link.isDropdown ? (
              <div key="lembaga" className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setLembagaOpen((v) => !v)}
                  aria-expanded={lembagaOpen}
                  className={`flex items-center gap-1 px-2 py-1 cursor-pointer ${
                    lembagaLinks.some((l) => pathname === l.href)
                      ? "bg-teal-800 text-white"
                      : transparent && !scrolled
                      ? "text-white hover:bg-white/20"
                      : "hover:bg-teal-100 text-black"
                  }`}
                >
                  LEMBAGA
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${lembagaOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {lembagaOpen && (
                  <div
                    className={`absolute top-full left-0 border border-gray-200 shadow-md mt-1 z-50 w-36 ${dropdownBg}`}
                  >
                    {lembagaLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href!}
                        onClick={() => setLembagaOpen(false)}
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

        {/* Mobile button - Diberi background solid agar tidak ikut transparan saat di-scroll/di atas */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden flex items-center justify-center p-2 rounded-lg bg-white text-teal-800 shadow-md cursor-pointer transition-transform active:scale-95"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
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