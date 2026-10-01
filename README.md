![](https://i.imgur.com/0wgSHAE.png)

# Next.js 待辦事項清單

此專案為六角學院 2024 Vue 前端新手營最終挑戰之成品，後續透過 Antigravity AI 協助重構為 Next.js App Router 架構，串接六角 Todolist API。

- [線上部署連結](https://next-todolist.worksbyaaron.com/login)
- [設計稿](https://www.figma.com/design/MFSk8P5jmmC2ns9V9YeCzM/TodoList?node-id=0-1&t=hgswJMZPd4ttA8R8-0)
- [API 文件](https://todolist-api.hexschool.io/doc/#/)
- [完整過程錄影](https://www.youtube.com/watch?v=w0xcsgtnoFA)

## 功能

- 帳號註冊、登入與登出。
- 新增、刪除待辦事項，切換完成狀態。
- 依全部、待完成、已完成篩選清單，顯示各狀態的項目數量。
- 使用 Cookie 保存登入 Token 與暱稱，由 Proxy 控制頁面導向。

## 使用技術

| 套件／工具 | 目前版本與用途 |
| --- | --- |
| [Next.js](https://nextjs.org/) | 16.3.8，App Router、Server／Client Components、Proxy |
| [React／React DOM](https://react.dev/) | 19.3.0，元件與互動狀態管理 |
| [SweetAlert2](https://sweetalert2.github.io/) | 11.26.25，登入、註冊與登出提示 |
| CSS Modules | 頁面與元件樣式；全域重設與捲軸樣式位於 `globals.css` |
| Fetch API | 集中封裝 API 請求，自動帶入登入 Token |

套件版本範圍設定於 `package.json`，實際安裝版本由 `package-lock.json` 鎖定。專案保留簡單的開發與建置流程，目前未使用 ESLint。

## 開發環境

- Node.js 20.9.0 以上，搭配 npm；本次更新使用 Node.js 24.12.0 驗證。
- 開發與建置使用 Next.js 預設的 Turbopack。
- 建置時 `next/font/google` 需要連線下載 Noto Sans TC 字型。
- 登入與待辦事項操作需要連線至六角 Todolist API，目前 API 網址固定於 `src/lib/api.js`，不需額外設定環境變數。

## 快速開始

複製專案並依鎖定檔安裝套件：

```sh
git clone https://github.com/happyloa/next-todolist.git
cd next-todolist
npm ci
```

啟動開發伺服器：

```sh
npm run dev
```

開啟 `http://localhost:3000/`，會重新導向至 `/login`。

建立並啟動正式版本：

```sh
npm run build
npm run start
```

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建立正式版本 |
| `npm run start` | 啟動已建置的正式版本，需先執行 build |
| `npm audit` | 檢查目前相依套件的已知安全漏洞 |
| `npm outdated` | 檢查直接相依套件是否有新版本 |

若要更新套件，使用 `npm install 套件名稱@版本` 或 `npm update`，並一併提交套件設定與鎖定檔。更新後可依序執行 `npm ci`、`npm audit` 與 `npm run build`，再檢查頁面與操作流程。

## 專案結構

以下列出主要檔案，各頁面與元件的 CSS Modules 放在對應目錄內。

```text
next-todolist/
├── public/
│   ├── icons/                          新增與刪除圖示
│   ├── image/                          Logo 與裝飾圖片
│   └── og-image.webp                   社群分享圖片
├── src/
│   ├── app/
│   │   ├── login/page.jsx              登入頁面（/login）
│   │   ├── register/page.jsx           註冊頁面（/register）
│   │   ├── todos/page.jsx              待辦頁面（/todos），讀取 Cookie 暱稱
│   │   ├── favicon.ico                 網站圖示
│   │   ├── globals.css                 全域重設與捲軸樣式
│   │   └── layout.jsx                  根佈局、Google Fonts 與 Metadata
│   ├── components/
│   │   ├── forms/
│   │   │   ├── login-form.jsx          登入表單
│   │   │   └── register-form.jsx       註冊表單
│   │   ├── todos/
│   │   │   ├── todos-page-client.jsx   使用者資訊、登出與清單容器
│   │   │   ├── todo-input.jsx          新增待辦事項
│   │   │   ├── todo-list-content.jsx   清單資料載入與重新整理
│   │   │   ├── todo-list-item.jsx      篩選、刪除與切換完成狀態
│   │   │   └── todo-no-item.jsx        空清單畫面
│   │   └── logo-and-deco-image.jsx     登入與註冊頁面共用圖片
│   ├── lib/
│   │   ├── api.js                      Fetch API 封裝
│   │   ├── utils.js                    Cookie 工具
│   │   └── show-alert.js               SweetAlert2 封裝
│   └── proxy.js                        依登入 Cookie 決定頁面導向
├── jsconfig.json                       @/* 對應 src/* 的路徑別名
├── next.config.mjs                     首頁重新導向設定
├── package.json                        套件版本範圍與執行指令
└── package-lock.json                   套件安裝鎖定檔
```

## 路由與 API

- `/`：以 HTTP 308 永久重新導向至 `/login`。
- `/login`、`/register`：若已有 `hexschoolTodo` Cookie，Proxy 會導向 `/todos`。
- `/todos`：若沒有 `hexschoolTodo` Cookie，Proxy 會導向 `/login`；頁面在伺服器端讀取暱稱，清單由 Client Component 載入。
- `src/lib/api.js`：向 `https://todolist-api.hexschool.io` 發送請求，有 Token 時自動設定 `Authorization` 標頭。

Proxy 只檢查 Cookie 是否存在，Token 是否有效由六角 API 驗證。帳號與待辦資料儲存於外部 API，專案本身沒有資料庫或自建的 API 路由。
