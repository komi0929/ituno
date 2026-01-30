"use client";

import { Menu } from "lucide-react";
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

  // itone専用のナビゲーション（Appleと無関係）
  const navItems = [
    { label: "機能", href: "#features" },
    { label: "デモ", href: "/demo" },
    { label: "料金", href: "#pricing" },
    { label: "サポート", href: "#support" },
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
        {/* Logo - itone */}
        <Link
          href="/"
          className="text-[18px] font-semibold text-[#1d1d1f] hover:opacity-70 transition-opacity tracking-tight"
        >
          itone
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12px] font-normal text-[#1d1d1f]/80 tracking-normal transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:block text-[12px] font-normal text-[#1d1d1f]/80 hover:text-black transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-[#0071e3] px-4 py-1.5 text-[12px] font-medium text-white transition-all hover:bg-[#0077ed]"
          >
            無料で始める
          </Link>
          <button className="md:hidden text-[#1d1d1f]">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
