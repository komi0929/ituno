"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-white pt-[44px] overflow-hidden">
      <div className="w-full flex flex-col items-center pt-12 pb-0 md:pt-20 text-center">
        {/* Headline - itone専用 */}
        <h1 className="text-[40px] md:text-[64px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.05] animate-fade-in-up">
          itone
        </h1>
        <p className="mt-2 md:mt-3 text-[21px] md:text-[28px] font-normal text-[#1d1d1f] animate-fade-in-up delay-100">
          iOS風ポートフォリオを、あなたの手で。
        </p>

        {/* CTA - itone専用 */}
        <div className="mt-5 flex items-center gap-6 animate-fade-in-up delay-200">
          <Link
            href="/login"
            className="text-[#0066cc] hover:underline text-[17px] md:text-[21px] flex items-center gap-0.5 group"
          >
            無料で作成{" "}
            <span className="text-[14px] group-hover:translate-x-0.5 transition-transform">
              ﹥
            </span>
          </Link>
          <Link
            href="/demo"
            className="text-[#0066cc] hover:underline text-[17px] md:text-[21px] flex items-center gap-0.5 group"
          >
            デモを見る{" "}
            <span className="text-[14px] group-hover:translate-x-0.5 transition-transform">
              ﹥
            </span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="mt-10 md:mt-14 relative w-full flex justify-center animate-fade-in-up delay-300">
          <div className="h-[400px] w-[240px] md:h-[580px] md:w-[300px] rounded-t-[40px] border-t-[10px] border-x-[10px] border-[#1d1d1f] bg-black relative overflow-hidden shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.1)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1621360841013-c768371e93cf?q=80&w=2540&auto=format&fit=crop')",
              }}
            >
              <div className="mt-12 px-4 grid grid-cols-4 gap-3 opacity-90">
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
