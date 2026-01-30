import { Smartphone } from "lucide-react";
import Link from "next/link";

export function BentoGrid() {
  return (
    <section className="bg-white py-4 px-4">
      <div className="mx-auto max-w-[1200px]">
        {/* Apple Style 2-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit 1: Japanese */}
          <div className="relative h-[500px] md:h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-12 md:pt-16 text-center transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] mb-1">
                物理演算。
              </h3>
              <p className="text-[17px] md:text-[21px] text-[#1d1d1f] mb-3">
                本物のようなiOSの操作感。
              </p>
              <Link
                href="/demo"
                className="text-[#0066cc] hover:underline text-[17px] flex items-center justify-center gap-0.5 group"
              >
                さらに詳しく{" "}
                <span className="text-[13px] group-hover:translate-x-0.5 transition-transform">
                  ﹥
                </span>
              </Link>
            </div>
            <div className="mt-10 w-[260px] h-[380px] bg-white shadow-xl rounded-t-[25px] flex items-center justify-center border-t border-x border-black/5 animate-fade-in-up">
              <Smartphone className="h-24 w-24 text-gray-200" />
            </div>
          </div>

          {/* Unit 2: Japanese */}
          <div className="relative h-[500px] md:h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-12 md:pt-16 text-center transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] mb-1">
                カスタマイズ。
              </h3>
              <p className="text-[17px] md:text-[21px] text-[#1d1d1f] mb-3">
                あなただけのスタイルを。
              </p>
              <div className="flex gap-6 justify-center">
                <Link
                  href="/demo"
                  className="text-[#0066cc] hover:underline text-[17px] flex items-center justify-center gap-0.5 group"
                >
                  さらに詳しく{" "}
                  <span className="text-[13px] group-hover:translate-x-0.5 transition-transform">
                    ﹥
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="text-[#0066cc] hover:underline text-[17px] flex items-center justify-center gap-0.5 group"
                >
                  購入{" "}
                  <span className="text-[13px] group-hover:translate-x-0.5 transition-transform">
                    ﹥
                  </span>
                </Link>
              </div>
            </div>
            {/* Vibrant Circle visual */}
            <div className="mt-16 w-[240px] h-[240px] rounded-full bg-linear-to-tr from-blue-400 via-purple-500 to-pink-500 shadow-2xl blur-[20px] opacity-70 group-hover:scale-105 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}
