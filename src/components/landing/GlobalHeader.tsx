"use client";

import { Apple, Search, ShoppingBag } from "lucide-react";
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

  const navItems = [
    { label: "ストア", href: "/demo" },
    { label: "Mac", href: "/demo" },
    { label: "iPad", href: "/demo" },
    { label: "iPhone", href: "/demo" },
    { label: "Watch", href: "/demo" },
    { label: "Vision", href: "/demo" },
    { label: "AirPods", href: "/demo" },
    { label: "TV & Home", href: "/demo" },
    { label: "エンターテインメント", href: "/demo" },
    { label: "アクセサリ", href: "/demo" },
    { label: "サポート", href: "/demo" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[44px] max-w-[1024px] items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-[#1d1d1f] hover:opacity-60 transition-opacity"
        >
          <Apple className="h-[18px] w-[18px] fill-current" />
        </Link>

        {/* Navigation - Desktop (Japanese) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] font-normal text-[#1d1d1f]/80 tracking-normal transition-colors hover:text-black whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Icons Right */}
        <div className="flex items-center gap-5">
          <button className="text-[#1d1d1f] hover:opacity-60 transition-opacity">
            <Search className="h-[16px] w-[16px]" />
          </button>
          <button className="text-[#1d1d1f] hover:opacity-60 transition-opacity">
            <ShoppingBag className="h-[16px] w-[16px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
