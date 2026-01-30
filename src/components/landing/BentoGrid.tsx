import { Palette, Smartphone } from "lucide-react";
import Link from "next/link";

export function BentoGrid() {
  return (
    <section id="features" className="bg-white py-4 px-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feature 1: itone専用 - ドラッグ＆ドロップ */}
          <div className="relative h-[480px] md:h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-12 md:pt-16 text-center transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] mb-1">
                直感的な編集。
              </h3>
              <p className="text-[17px] md:text-[21px] text-[#1d1d1f] mb-3">
                ドラッグ＆ドロップでアイコンを配置。
              </p>
              <Link
                href="/demo"
                className="text-[#0066cc] hover:underline text-[17px] flex items-center justify-center gap-0.5 group"
              >
                デモで体験{" "}
                <span className="text-[13px] group-hover:translate-x-0.5 transition-transform">
                  ﹥
                </span>
              </Link>
            </div>
            <div className="mt-8 w-[240px] h-[340px] bg-white shadow-xl rounded-t-[25px] flex items-center justify-center border-t border-x border-black/5 animate-fade-in-up">
              <Smartphone className="h-20 w-20 text-gray-200" />
            </div>
          </div>

          {/* Feature 2: itone専用 - テーマカスタマイズ */}
          <div className="relative h-[480px] md:h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-12 md:pt-16 text-center transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[28px] md:text-[40px] font-semibold text-[#1d1d1f] mb-1">
                自分らしさを表現。
              </h3>
              <p className="text-[17px] md:text-[21px] text-[#1d1d1f] mb-3">
                壁紙やテーマを自由に選べる。
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
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center">
              <Palette className="h-28 w-28 text-blue-400 opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
