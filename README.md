# 祈滕網站 (Qi-Teng Website)

這是一個以 Next.js App Router 建置的「祈滕網站」正式專案，包含前台官網與後台管理介面。網站目前已部署於 Linode，並以 PostgreSQL + Prisma 作為資料層。

## 專案內容

- 前台網站：首頁、關於、課程列表與課程內頁、最新消息、部落格、聯絡我們
- 後台管理：最新消息、部落格、課程、分類、網站內容、聯絡表單、使用者管理
- 功能重點：RWD、圖片上傳、SEO 基礎設定、內容管理、權限控管

## 技術棧

- Next.js 16.2.2
- React 19
- TypeScript
- Prisma 7.6.0
- PostgreSQL
- NextAuth 4.24.13
- Tailwind CSS
- Framer Motion

## 專案結構

實際可維護的前端專案在 [`web/`](web/) 目錄內。

```text
祈滕網站/
├── web/                # Next.js 主專案
├── fonts/              # 原始字型
├── SVG/                # 原始向量素材
├── 素材/               # 分類整理後的網站素材
└── 設計稿/             # 視覺設計稿
```

## 本機開發

先進入 `web/` 目錄再執行指令。

```bash
cd web
npm install
npm run dev
```

開啟 http://localhost:3000

## 環境變數

`web/.env` 需要至少包含：

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 資料庫與 Prisma

```bash
cd web
npx prisma generate
npx prisma db push
npm run seed
```

## 部署方式

目前正式站部署於：

- `http://172.233.87.240/`
- 後台登入：`http://172.233.87.240/admin/login`

伺服器設定：

- OS：Ubuntu 24.04
- Node.js：22.x
- PM2：`nextjs-qiteng`
- PostgreSQL：本機服務執行於 `localhost:5432`

常用部署流程：

```bash
scp -r web/src web/public web/package.json web/package-lock.json web/tsconfig.json web/next.config.ts web/postcss.config.mjs web/eslint.config.mjs web/next-env.d.ts root@172.233.87.240:/var/www/qiteng/
ssh root@172.233.87.240 "cd /var/www/qiteng && npm ci && npx prisma db push && npm run build && pm2 restart nextjs-qiteng"
```

## 重要備註

- 管理員帳號由 seed 建立，不建議把密碼寫入 README
- 圖片上傳已加入副檔名、MIME 與大小限制
- 後台內容頁面已改為共用元件與 RESTful API
