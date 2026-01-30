"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function GlobalHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[48px] max-w-[1024px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-[#1d1d1f] transition-opacity hover:opacity-70"
        >
          itone
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/demo"
            className="text-[12px] font-normal text-[#1d1d1f]/80 transition-colors hover:text-[#0071e3]"
          >
            Demo
          </Link>
          <Link
            href="/login"
            className="text-[12px] font-normal text-[#1d1d1f]/80 transition-colors hover:text-[#0071e3]"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-[#0071e3] px-3 py-1 text-[12px] font-medium text-white transition-all hover:bg-[#0077ed]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
