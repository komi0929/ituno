# itone - iOS 18 Portfolio Builder

iOS 18風のポートフォリオをWeb上で完全再現するプロジェクト。

## 特徴

- 🍎 **iOS 18 UI**: Jiggle Mode, Dynamic Island, Glassmorphism Dock
- 🎯 **Drag & Drop**: dnd-kitによるアプリアイコンの並べ替え
- ⚡ **Live Preview**: 編集内容をリアルタイムでプレビュー
- 🔐 **認証**: Supabase Auth (Email/Password)
- 📱 **レスポンシブ**: PC/Mobile対応

## デモ

- `/demo` - モックデータでiOS UIを体験

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Drag & Drop**: dnd-kit
- **Database**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **Deploy**: Vercel

## セットアップ

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local を編集してSupabase認証情報を設定

# 開発サーバー起動
npm run dev
```

## 環境変数

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## ページ構成

| Path | 説明 |
|------|------|
| `/` | ランディングページ |
| `/[username]` | パブリックプロフィール |
| `/demo` | デモモード |
| `/login` | ログイン/サインアップ |
| `/admin` | 管理パネル |

## ライセンス

MIT
