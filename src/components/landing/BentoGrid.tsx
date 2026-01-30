import { Smartphone } from "lucide-react";
import Link from "next/link";

export function BentoGrid() {
  return (
    <section className="bg-white py-4 px-4">
      <div className="mx-auto max-w-[1200px]">
        {/* 2-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit 1: Fidelity (iPad Air Style) */}
          <div className="relative h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-16 text-center group transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[32px] md:text-[40px] font-semibold text-[#1d1d1f] mb-2">
                Fidelity.
              </h3>
              <p className="text-[19px] md:text-[21px] text-[#1d1d1f] mb-4">
                True-to-life iOS physics.
              </p>
              <Link
                href="/demo"
                className="text-[#0071e3] hover:underline text-[17px] flex items-center justify-center gap-1"
              >
                Learn more <span className="text-[14px]">﹥</span>
              </Link>
            </div>
            {/* Image */}
            <div className="mt-12 w-[300px] h-[400px] bg-white shadow-xl rounded-t-[30px] flex items-center justify-center border-t border-x border-black/5">
              <Smartphone className="h-32 w-32 text-gray-300" />
            </div>
          </div>

          {/* Unit 2: Theming (Apple Watch Style) */}
          <div className="relative h-[580px] overflow-hidden bg-[#f5f5f7] flex flex-col items-center pt-16 text-center group transition-transform hover:scale-[1.005]">
            <div className="z-10 px-6">
              <h3 className="text-[32px] md:text-[40px] font-semibold text-[#1d1d1f] mb-2">
                Theming.
              </h3>
              <p className="text-[19px] md:text-[21px] text-[#1d1d1f] mb-4">
                Your look. Your vibe.
              </p>
              <div className="flex gap-6 justify-center">
                <Link
                  href="/demo"
                  className="text-[#0071e3] hover:underline text-[17px] flex items-center justify-center gap-1"
                >
                  Learn more <span className="text-[14px]">﹥</span>
                </Link>
                <Link
                  href="/login"
                  className="text-[#0071e3] hover:underline text-[17px] flex items-center justify-center gap-1"
                >
                  Buy <span className="text-[14px]">﹥</span>
                </Link>
              </div>
            </div>
            {/* Image - Colorful Circle */}
            <div className="mt-16 w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 shadow-2xl blur-[20px] opacity-80 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
