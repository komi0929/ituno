"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#000000] pt-[52px]">
      {/* Background Glow */}
      <div className="absolute top-[-20%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="z-10 flex flex-col items-center px-4 text-center">
        {/* Badge */}
        <div className="mb-6 animate-fade-in-up md:mb-8">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md">
            New Release <ChevronRight className="h-3 w-3 text-white/50" />
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up max-w-[800px] text-5xl font-bold tracking-tight text-[#f5f5f7] md:text-7xl lg:text-8xl">
          Your Portfolio.
          <br />
          <span className="bg-gradient-to-r from-[#2997ff] to-[#bd34fe] bg-clip-text text-transparent">
            Reimagined.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-100 mt-6 max-w-[600px] text-lg font-medium leading-relaxed text-[#86868b] md:text-xl">
          Transform your links into a stunning iOS-style home screen.
          <br className="hidden md:block" />
          Simple, beautiful, and uniquely yours.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up delay-200 mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-full bg-[#2997ff] px-8 py-3 text-[17px] font-medium text-white transition-transform hover:scale-105 active:scale-95"
          >
            Create yours
          </Link>
          <Link
            href="/demo"
            className="group flex items-center justify-center gap-1 rounded-full border border-[#2997ff] px-8 py-3 text-[17px] font-medium text-[#2997ff] transition-colors hover:bg-[#2997ff] hover:text-white"
          >
            View Demo{" "}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Visual / Mockup Area */}
        <div className="animate-fade-in-up delay-300 mt-20 relative h-[400px] w-full max-w-[300px] overflow-hidden rounded-[40px] border-[8px] border-[#1d1d1f] bg-black shadow-2xl md:h-[600px] md:max-w-[350px]">
          {/* Mockup Screen Content (Abstract representation of iOS Home) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1697525624773-637dc4363495?q=80&w=2669&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            {/* Fake App Icons Grid */}
            <div className="grid grid-cols-4 gap-4 p-6 mt-12">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-[14px] bg-white/10 backdrop-blur-md"
                />
              ))}
            </div>

            {/* Lower Dock */}
            <div className="absolute bottom-6 left-4 right-4 h-24 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-around px-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square w-12 rounded-[12px] bg-gradient-to-b from-blue-400 to-blue-600"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
