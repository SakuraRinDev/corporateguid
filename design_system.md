# 🎨 AI EXPO 2026 デザインシステム

## 1. コンセプト：Organic Science（有機的な科学）

**核となる思想：「自然界の複雑さ」を「デジタルの明快さ」で整理する**

| 有機的（背景・雰囲気） | 無機的（UI・テキスト） |
|----------------------|----------------------|
| 温かみのある紙の質感 | 冷徹で正確なデータ表示 |
| 緩やかな変化 | シャープな線とマーカー |
| ニュアンスのある色調 | 等幅フォント・座標表示 |

---

## 2. カラーパレット：2つのPhase

スクロール進行に合わせて背景色が劇的に変化する「没入型」の配色計画です。

### Phase A（フィールドワーク/明るい状態）
```css
--phase-a-bg: #F5F2EB;      /* 温かみのあるオフホワイト */
--phase-a-ink: #1A1A1A;      /* 黒に近いインク色 */
--phase-a-muted: #8A847A;    /* 控えめなグレー */
--phase-a-line: #C4BFB4;     /* ライン・ボーダー */
```

### Phase B（解析/ダークモード）
```css
--phase-b-bg: #1A1525;       /* 深い紫がかったダーク */
--phase-b-ink: #E8E4F0;      /* 明るい文字色 */
--phase-b-muted: #6B6480;    /* 控えめなラベンダー */
--phase-b-line: #3D3650;     /* 暗いボーダー */
```

### ネオンアクセント（Phase Bで発光）
```css
--neon-green: #39FF14;   /* ✅ 主要アクセント・リスト記号 */
--neon-pink: #FF1493;    /* ⚠️ 警告・禁止事項 */
--neon-cyan: #00F5FF;    /* 🔗 見出し・リンク・ホバー */
--neon-yellow: #FFFF00;  /* 予備 */
```

**使い分けルール：**
- Phase A → ネオンは控えめ（グリーンのみアクセント使用）
- Phase B → ネオンカラーを積極的に使用し「発光」させる

---

## 3. タイポグラフィ：2つの書体

### Display（見出し・本文）
```css
--font-display: 'Cormorant Garamond', 'Noto Serif JP', serif;
```
- **用途**: h1, h2, h3, 本文テキスト
- **意図**: 科学雑誌・論文のようなアカデミックで権威ある印象
- **特徴**: 少しゆったりした文字詰め

### Data / UI（データ・注釈）
```css
--font-data: 'IBM Plex Mono', monospace;
```
- **用途**: ラベル、座標表示、カテゴリタグ、ナビゲーション、リスト
- **意図**: 「生のデータ」「正確な数値」であることを示す
- **特徴**: `letter-spacing: 0.1em〜0.3em` で広めに

---

## 4. レイアウトシステム

### 余白規則
```css
/* 左右余白 */
--gutter-desktop: 120px;
--gutter-tablet: 60px;
--gutter-mobile: 30px;

/* セクション上下余白 */
--section-vertical: 150px;
--section-vertical-tablet: 100px;
--section-vertical-mobile: 80px;
```

### セクション構造（必須パターン）
```html
<section id="section1" class="fade-in">
    <!-- 1. 背景の大きな番号 -->
    <div class="section-number">01</div>
    
    <!-- 2. セクションマーカー（英語ラベル） -->
    <div class="section-marker">SECTION 01 — ENGLISH TITLE</div>
    
    <!-- 3. 見出し -->
    <h2>日本語タイトル</h2>
    
    <!-- 4. コンテンツ -->
    ...
</section>
```

---

## 5. Technical Overlays（必須要素）

他のページでも必ず配置する「計測対象である」ことを示す装飾：

```html
<!-- グリッド線（背景に薄く表示） -->
<div class="grid-overlay"></div>

<!-- データストリーム（左端の点線） -->
<div class="data-stream"></div>

<!-- The Thread（スクロールに連動する導線） -->
<div class="thread" id="thread"></div>

<!-- 座標表示（右上のステータス） -->
<div class="coordinates">
    <span id="scroll-percent">SCROLL: 0%</span>
    <span id="phase-display">PHASE: A</span>
    <span id="section-display">SEC: HERO</span>
</div>
```

---

## 6. UIコンポーネント一覧

### 6.1 テキストスタイル
| クラス | 用途 |
|--------|------|
| `.eyebrow` | 上部の小さなラベル（大文字・等幅） |
| `.emphasis` | 強調テキスト（1.3rem） |
| `.lead` | リード文（1.1rem） |
| `.caption` | 注釈（12px・等幅） |
| `.text-muted` | 控えめなテキスト |

### 6.2 ボックス系
| コンポーネント | 用途 | Phase B での変化 |
|---------------|------|-----------------|
| `.tech-box` | 重要な情報枠（四隅に+マーク） | シアン発光 |
| `.info-box` | 補足情報（破線ボーダー） | シアン背景 |
| `.warning-box` | 警告・注意事項 | ピンク発光 |
| `.format-card` | カード形式のコンテンツ | ホバーで浮き上がり |

### 6.3 リスト系
| コンポーネント | 用途 |
|---------------|------|
| `.data-list` | 等幅フォントのリスト（`›` マーカー） |
| `.format-list` | カード内リスト（`▸` マーカー） |
| `.category-tag` | タグ形式（ホバーでグリーン反転） |
| `.prohibition-item` | 禁止項目（`✕` マーカー・ピンク） |

---

## 7. アニメーション規則

### 7.1 フェードイン（スクロール連動）
```css
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```
→ `IntersectionObserver` で閾値25%を超えると発火

### 7.2 Phase切り替え
- トリガー: Section 02 がビューポート上部45%に到達
- トランジション: `transition: background-color 0.8s ease, color 0.8s ease`

### 7.3 ホバーエフェクト
- カード: `transform: translateY(-4px)` + シアン発光
- タグ: グリーン背景に反転
- リンク: シアン発光

### 7.4 Phase Bでのグリッチ効果
```css
@keyframes glitch {
    0%, 90%, 100% { text-shadow: none; }
    92% { text-shadow: -2px 0 var(--neon-pink), 2px 0 var(--neon-cyan); }
    94% { text-shadow: 2px 0 var(--neon-pink), -2px 0 var(--neon-cyan); }
}
```

---

## 8. 新しいページを作るときのチェックリスト

### 必須要素
- [ ] Google Fonts の読み込み（Cormorant Garamond, Noto Serif JP, IBM Plex Mono）
- [ ] CSS変数の定義
- [ ] Technical Overlays（grid-overlay, data-stream, thread, coordinates）
- [ ] ナビゲーション（右側固定・等幅フォント）
- [ ] Phase切り替えロジック（JS）

### セクション作成時
- [ ] セクション番号（`.section-number`）
- [ ] セクションマーカー（`.section-marker`）英語で
- [ ] `fade-in` クラスの付与
- [ ] 見出しには必ず h2/h3 を使用

### テキスト・データ表示
- [ ] ラベル → `.eyebrow` + 等幅フォント + 大文字
- [ ] 日付・バージョン → 等幅フォント
- [ ] リスト → `.data-list` または `.format-list`
- [ ] 警告 → `.warning-box` + ピンク
- [ ] 重要情報 → `.tech-box` + 四隅マーク

### カラー使い分け
- [ ] Phase A: 落ち着いたベージュ系、ネオンは控えめ
- [ ] Phase B: ダーク背景、ネオン発光を積極的に
- [ ] 警告/禁止 → ピンク
- [ ] アクション/進行 → グリーン
- [ ] リンク/インタラクティブ → シアン

---

## 9. 禁止事項（デザイン的に避けること）

❌ **やってはいけないこと**
- 丸みを帯びたUI（すべてシャープに）
- カラフルなグラデーション背景
- 装飾的なアイコン（記号で代用）
- 影の多用（Phase Bのネオン発光のみ）
- ポップなフォント
- アニメーションの乱用（控えめに、意味のある動きのみ）

✅ **常に意識すること**
- 「計測・解析している」という文脈を維持
- データはすべて等幅フォントで表示
- 余白を十分に取る（詰め込まない）
- Phase A/B の一貫性を保つ

---

## 10. 参考：元のコンセプト

このデザインの核は、「自然界の複雑さ」を「デジタルの明快さ」で整理するという対比にあります。

* **世界観の対比**: 「森・生物・ノイズ（有機物）」に対し、「座標・解析・波形（無機物）」をぶつける。
* **役割分担**: 背景や地図は有機的なニュアンスを残し、UIエレメント（ボタン、線、テキスト）は極めて冷徹で機能的に配置する。

### カラーパレットの法則：Phases of Analysis（解析のフェーズ）

スクロール（時間の経過や解析の深化）に合わせて、背景色が劇的に変化する「没入型」の配色計画です。

* **Phase A（フィールドワーク/表層）**:
  * 背景: Warm Off-White / Beige。紙の地図やレポート用紙を想起させる、温かみのある白。
  * インク: 黒に近いグレー。

* **Phase B（解析/深層）**:
  * 背景: Deep Violet / Dark Grey。漆黒ではなく、少し紫や青みを含んだ「デジタルの深淵」を感じさせる色。
  * アクセント: Neon Green Hot Pink Cyan。
  * ルール: 暗い背景になった瞬間、データ（点、線、波形）を高彩度のネオンカラーで発光させ、データの存在感を強調する。

### タイポグラフィの法則：Academic vs Technical

2つの異なる書体を使い分け、情報の性質を定義しています。

* **Display (見出し・ナラティブ)**:
  * 書体: 上品なSerif（セリフ体）。
  * 意図: 「科学雑誌」や「論文」のようなアカデミックで権威ある印象を与える。文字詰めは少しゆったりと。

* **Data / UI (データ・注釈)**:
  * 書体: Monospace（等幅フォント）。
  * 意図: 「生のデータ」「コード」「正確な数値」であることを示す。緯度経度、時間、鳥の名前などのスペック情報に使用。

### レイアウトとモーションの法則：Scrollytelling with Guidelines

ただスクロールさせるのではなく、ユーザーを「視覚的にガイド」するルールが徹底されています。

* **The "Thread" (導線)**:
  * 細いラインがスクロールと共に伸び、ユーザーの視線を中央や次のセクションへ物理的に誘導する。線が「道しるべ」の役割を果たす。

* **Split Screen Sticky (追従)**:
  * 左側のテキスト（説明）は固定（Sticky）され、右側のビジュアル（地図・波形）だけがスクロールに応じて変化する。
  * ルール: 説明文を読ませながら、横で動的に図解を行う「プレゼンテーション」の形式をとる。

* **Technical Overlays**:
  * 地図やビジュアルの上に、細いグリッド線、十字のマーカー、座標数値をオーバーレイ（重ね掛け）する。これにより、ただの「風景写真」ではなく「計測対象」であるというコンテキストを作る。

---

**最終更新**: 2024.12
**ドキュメントバージョン**: 1.0.0


