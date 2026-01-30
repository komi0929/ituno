import Link from "next/link";

export function Footer() {
  // itone専用のフッターリンク（Appleと無関係）
  const footerSections = [
    {
      title: "itone",
      links: [
        { label: "機能紹介", href: "#features" },
        { label: "料金プラン", href: "#pricing" },
        { label: "テンプレート", href: "/demo" },
      ],
    },
    {
      title: "サポート",
      links: [
        { label: "ヘルプセンター", href: "#" },
        { label: "お問い合わせ", href: "#" },
        { label: "よくある質問", href: "#" },
      ],
    },
    {
      title: "会社情報",
      links: [
        { label: "運営会社", href: "#" },
        { label: "採用情報", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#f5f5f7] text-[12px] leading-snug text-[#6e6e73] pb-8">
      <div className="mx-auto max-w-[1024px] px-4 md:px-6">
        <div className="w-full border-t border-[#d2d2d7] pt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[#1d1d1f] font-semibold mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:underline hover:text-[#1d1d1f] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#d2d2d7] pt-6 flex flex-col md:flex-row justify-between text-[11px] text-[#6e6e73]">
            <p className="mb-2 md:mb-0">
              Copyright © 2026 itone Inc. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link
                href="/privacy"
                className="hover:underline hover:text-[#1d1d1f]"
              >
                プライバシーポリシー
              </Link>
              <span className="text-[#d2d2d7]">|</span>
              <Link
                href="/terms"
                className="hover:underline hover:text-[#1d1d1f]"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
