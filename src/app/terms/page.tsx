import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-300">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">利用規約</h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            この利用規約（以下「本規約」といいます。）は、itone（以下「当サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆様（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </p>

          <h2 className="text-xl font-semibold text-white">第1条（適用）</h2>
          <p>
            本規約は、ユーザーと当サービス運営者（以下「運営者」といいます。）との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第2条（利用登録）
          </h2>
          <p>
            登録希望者が運営者の定める方法によって利用登録を申請し、運営者がこれを承認することによって、利用登録が完了するものとします。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第3条（禁止事項）
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>
              本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
            </li>
            <li>
              他のユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">
            第4条（免責事項）
          </h2>
          <p>
            運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第5条（サービス内容の変更等）
          </h2>
          <p>
            運営者は、ユーザーに通知することなく、本サービスの内容を変更し、または本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
          </p>
        </section>

        <div className="mt-12 border-t border-zinc-800 pt-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
