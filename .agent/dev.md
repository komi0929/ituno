---
description: Next.js開発サーバー起動
---

# 開発サーバー起動ワークフロー

## 手順

// turbo-all

1. 依存関係をインストール（初回または変更時のみ）
```powershell
npm install
```

2. 開発サーバーを起動
```powershell
npm run dev
```

3. ブラウザで確認
  - http://localhost:3000 を開く

## Tips
- ポート変更: `npm run dev -- -p 3001`
- Turbo Mode: `npm run dev --turbo`
