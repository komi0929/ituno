---
description: プロジェクト初期セットアップ
---

# プロジェクト初期セットアップ

## 手順

// turbo-all

1. 依存関係をインストール
```powershell
npm install
```

2. 環境変数を設定（.env.localを作成）
```powershell
Copy-Item .env.example .env.local -ErrorAction SilentlyContinue
```

3. Prisma/Supabase設定（該当する場合）
```powershell
npx prisma generate
```

4. 開発サーバーを起動
```powershell
npm run dev
```
