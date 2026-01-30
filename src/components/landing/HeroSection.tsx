"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-white pt-[44px] overflow-hidden">
      {/* Unit Container */}
      <div className="w-full flex flex-col items-center pt-12 pb-0 md:pt-16 text-center">
        {/* Headline Cluster (Japanese) */}
        <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.1] animate-fade-in-up">
          itone
        </h2>
        <h3 className="mt-1 md:mt-2 text-[19px] md:text-[28px] font-normal text-[#1d1d1f] animate-fade-in-up delay-100">
          あなたのポートフォリオを、再発明する。
        </h3>

        {/* CTA Links (Japanese) */}
        <div className="mt-4 flex items-center gap-6 animate-fade-in-up delay-200">
          <Link
            href="/demo"
            className="text-[#0066cc] hover:underline text-[17px] md:text-[21px] flex items-center gap-0.5 group"
          >
            さらに詳しく{" "}
            <span className="text-[14px] group-hover:translate-x-0.5 transition-transform">
              ﹥
            </span>
          </Link>
          <Link
            href="/login"
            className="text-[#0066cc] hover:underline text-[17px] md:text-[21px] flex items-center gap-0.5 group"
          >
            購入{" "}
            <span className="text-[14px] group-hover:translate-x-0.5 transition-transform">
              ﹥
            </span>
          </Link>
        </div>

        {/* Hero Image Container */}
        <div className="mt-10 md:mt-12 relative w-full flex justify-center animate-fade-in-up delay-300">
          {/* Mockup - Modern White iPhone Style */}
          <div className="h-[450px] w-[260px] md:h-[650px] md:w-[320px] rounded-t-[40px] border-t-[10px] border-x-[10px] border-[#1d1d1f] bg-black relative overflow-hidden shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1621360841013-c768371e93cf?q=80&w=2540&auto=format&fit=crop')",
              }}
            >
              {/* Icons - High Fidelity */}
              <div className="mt-14 px-5 grid grid-cols-4 gap-4 opacity-90">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-[12px] bg-white/90 backdrop-blur-md shadow-sm border border-white/20"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
