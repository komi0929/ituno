# 絶対的ルール: iOS UI再現

> [!CAUTION]
> このルールに違反した場合、即座にやり直しが必要。例外なし。

## 1. アプリアイコン

### 禁止事項

- icons8, flaticon, iconscout などの汎用アイコンライブラリの使用 ❌
- 自作・描画されたアイコンの使用 ❌
- SVG/CSSで描いたアイコンの使用 ❌

### 必須事項

- **実際のiOSアプリアイコン**を使用すること ✅
- Apple App Store の CDN から取得した公式アイコンを使用 ✅
- iTunes Search API でアプリアイコンURLを取得 ✅

### アイコン取得方法

```typescript
// iTunes Search API を使用
const response = await fetch(
  `https://itunes.apple.com/search?term=${appName}&entity=software&country=jp&limit=1`,
);
const data = await response.json();
const iconUrl = data.results[0]?.artworkUrl512;
```

---

## 2. デバイス仕様

### 禁止事項

- iPhone SE / iPhone 8 などの古いデバイス仕様の使用 ❌
- ノッチなしデザインの使用 ❌

### 必須事項

- **最新の iPhone 17 Pro / Pro Max** 仕様を使用 ✅
- Dynamic Island を実装 ✅
- 現行世代のスクリーンサイズを使用 ✅

### iPhone 17 Pro Max 仕様

| 項目                 | 値                         |
| -------------------- | -------------------------- |
| 論理解像度           | 430 x 932 pt               |
| Status Bar 高さ      | 59px (Dynamic Island 含む) |
| Dynamic Island       | 幅 126px, 高さ 37px        |
| ホームインジケーター | 幅 139px, 高さ 5px         |
| 画面角丸             | 55px                       |

---

## 3. クオリティ基準

### ユーザー体験目標

> ユーザーが URL を入力した瞬間、**実際の iPhone 画面を見ているかのような錯覚**を起こさせる

### 必須要素

- [ ] Dynamic Island が正確に描画されている
- [ ] ステータスバーが実機と同一
- [ ] アイコンが60x60ptで公式アートワーク使用
- [ ] ラベルが白色で適切なドロップシャドウ
- [ ] ドックがフロストガラスエフェクト
- [ ] 壁紙が全画面で正しく表示

---

## 4. 参照資料

- Apple iPhone 17: https://www.apple.com/jp/iphone-17/
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- iOS App Icon Design: https://developer.apple.com/design/human-interface-guidelines/app-icons

---

**このルールは永続的であり、すべての iOS UI 実装に適用される。**
