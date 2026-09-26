# Coffice 咖啡店 - 核心設計系統 (MASTER.md)

## 1. 品牌調性 (Brand Vibe)
- **核心理念**：溫暖、親和、有機 (Organic Elegance)。
- **沉浸式氛圍**：像走進一間木造裝潢、燈光柔和的咖啡空間。
- **目標客群**：尋找靜謐角落、熱愛咖啡工藝與生活品味的人群。

## 2. 視覺規範 (Visual Tokens)
### 色彩系統 (Colors)
- **Primary (深烘焙)**: `#4A3B32` - 用於核心標題、主視覺文字、強調整體沉穩感。
- **Secondary (焦糖拿鐵)**: `#D4A373` - 用於副標題、按鈕背景、引導視線的亮點色。
- **Background (燕麥奶白)**: `#FDFBF7` - 網頁全域背景色，護眼舒適。

### 字體系統 (Typography)
- **Headings (標題)**: `Playfair Display`, serif - 傳遞古典優雅與工藝感。
- **Body (內文)**: `Inter`, sans-serif - 確保高可讀性與現代感。

## 3. 核心組件與動態特效 (Components & Animations)

### 3.1 英雄區塊 (Hero Section)
- **特效**: GSAP SplitType 逐字彈跳 (Stagger Text)。
- **設定**: `stagger: 0.08`, `ease: "expo.out"`, `duration: 1.5`。
- **色彩**: 標題套用線性漸層 `linear-gradient(135deg, #4A3B32 0%, #D4A373 100%)`。

### 3.2 情境影片滾動區塊 (Apple-grade Video Scroll)
- **特效**: ScrollTrigger 綁定影片時間軸 (`pin: true`, `scrub: 0.8`)。
- **配置**: 向下滑動 `+=2500px` 完成播放。
- **互動**: 字幕會隨著滾動進度淡入淡出，營造沉浸式體驗。

### 3.3 招牌展示區 (SVG Mask Reveal)
- **特效**: SVG 圓形遮罩隨著滾動極速放大至 `250vmax`。
- **配置**: 釘住畫面 (`pin: true`)，滾動距離 `+=1500px`。
- **互動**: 揭露高清拉花照片，並在最後浮現「精湛工藝，暖心拿鐵」字樣。

### 3.4 互動式藝廊 (Flip.js Card Transition)
- **特效**: GSAP Flip.js 分類無縫洗牌過渡。
- **設定**: `duration: 0.8`, `stagger: 0.05`, `ease: "power2.inOut"`。
- **分類**: 全部 (All)、空間 (Space)、靈魂人物 (Team)。

## 4. UX 防禦準則 (UX Guidelines)
- **彈性文字 (Resilient Text)**：按鈕與標籤區塊必須使用 `flex-wrap`，確保在窄屏不斷行裁切。
- **高對比度 (Contrast)**：焦糖色 `#D4A373` 背景上的文字必須使用 `#4A3B32` 以通過對比度檢測。
- **鍵盤導航 (Focus)**：可點擊元素須配置清晰的 Focus 光環 (`focus:ring-coffee`)。
- **狀態還原 (Interruption Safety)**：快速切換分類時，依賴 Flip.js 的狀態接管機制，不產生中斷殘影。

## 5. 檔案庫對照 (Assets)
*請將實體檔案置於 `public` 或 `assets` 資料夾中對接。*
- `bg.jpg`
- `black_cat_portrait_1790312058979.jpg`
- `cozy_coffee_entrance_1790311210385.jpg`
- `cozy_coffee_latte_art_1790311102024.jpg`
- `Woman_sweeping_outside_bakery_1080p_20260919220917.mp4`
