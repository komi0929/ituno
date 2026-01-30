import Link from "next/link";

export function Footer() {
  const footerSections = [
    {
      title: "製品を知る",
      links: [
        "itone Pro",
        "itone Air",
        "itone mini",
        "itone Classic",
        "カスタマイズ",
        "アクセサリ",
      ],
    },
    {
      title: "サービス",
      links: [
        "Apple Music",
        "Apple TV+",
        "Apple Arcade",
        "iCloud",
        "Apple One",
        "Apple Pay",
        "Apple Books",
      ],
    },
    {
      title: "アカウント",
      links: ["Apple Accountの管理", "Apple Storeアカウント", "iCloud.com"],
    },
    {
      title: "Apple Store",
      links: [
        "お近くのApple Store",
        "Genius Bar",
        "Today at Apple",
        "Appleサマーキャンプ",
        "ご注文状況",
        "ご利用ガイド",
      ],
    },
    {
      title: "ビジネス / 教育",
      links: ["Appleとビジネス", "Appleと教育", "大学生活のためのMacとiPad"],
    },
  ];

  return (
    <footer className="bg-[#f5f5f7] text-[11px] leading-[1.3] text-[#6e6e73] pb-10">
      <div className="mx-auto max-w-[1024px] px-4 md:px-0">
        <div className="w-full border-t border-[#d2d2d7] pt-10">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 gap-x-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[#1d1d1f] font-semibold mb-2.5">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="/"
                        className="hover:underline hover:text-[#1d1d1f] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-[#d2d2d7] pt-8 flex flex-col md:flex-row justify-between text-[#6e6e73]">
            <p className="mb-2 md:mb-0">
              Copyright © 2026 itone Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link
                href="/privacy"
                className="hover:underline hover:text-[#1d1d1f] border-r border-[#d2d2d7] pr-4"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="hover:underline hover:text-[#1d1d1f] border-r border-[#d2d2d7] pr-4"
              >
                利用規約
              </Link>
              <Link
                href="/"
                className="hover:underline hover:text-[#1d1d1f] border-r border-[#d2d2d7] pr-4"
              >
                販売条件
              </Link>
              <Link href="/" className="hover:underline hover:text-[#1d1d1f]">
                サイトマップ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
