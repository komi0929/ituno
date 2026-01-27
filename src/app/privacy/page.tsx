import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-300">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-white">
          プライバシーポリシー
        </h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            itone（以下「当サービス」といいます。）は、本ウェブサイト上で提供するサービス（以下「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定めます。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第1条（個人情報）
          </h2>
          <p>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第2条（個人情報の収集方法）
          </h2>
          <p>
            当サービスは、ユーザーが利用登録をする際にメールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当サービスの提携先（情報提供元、広告主、広告配信先などを含みます。以下「提携先」といいます。）などから収集することがあります。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第3条（個人情報の利用目的）
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>当サービスの提供・運営のため</li>
            <li>
              ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
            </li>
            <li>
              ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当サービスが提供する他のサービスの案内のメールを送付するため
            </li>
            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">
            第4条（利用目的の変更）
          </h2>
          <p>
            当サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
          </p>

          <h2 className="text-xl font-semibold text-white">
            第5条（お問い合わせ窓口）
          </h2>
          <p>
            本ポリシーに関するお問い合わせは、当サービスのサポート窓口までお願いいたします。
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
