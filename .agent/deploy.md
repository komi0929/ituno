---
description: Vercel本番デプロイ
---

# Vercelデプロイワークフロー

## 手順

// turbo-all

1. ビルドエラーがないか確認
```powershell
npm run build
```

2. Git変更をコミット
```powershell
git add .
git commit -m "deploy: production release"
```

3. リモートにプッシュ（Vercel自動デプロイ）
```powershell
git push origin main
```

## Tips
- プレビューデプロイ: 他のブランチにプッシュ
- 強制デプロイ: `vercel --prod`
