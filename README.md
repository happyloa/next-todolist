![](https://i.imgur.com/0wgSHAE.png)

# 六角 Todolist API 重構為 Next.js 16

此專案為六角學院 2024 Vue 前端新手營最終挑戰之成品，經由 Antigravity AI 重構並優化架構為 Next.js 16 最佳實踐版本。

- [線上部署連結](https://next-todolist.worksbyaaron.com/login)
- [設計稿](https://www.figma.com/design/MFSk8P5jmmC2ns9V9YeCzM/TodoList?node-id=0-1&t=hgswJMZPd4ttA8R8-0)
- [API 文件](https://todolist-api.hexschool.io/doc/#/)
- [完整過程錄影](https://www.youtube.com/watch?v=w0xcsgtnoFA)

## 重構重點 (Next.js 16 Best Practices)

- **目錄結構優化**：所有原始碼皆移至 `src` 目錄，落實邏輯與設定分離。
- **命名規範化**：元件與檔案統一採用 `kebab-case.jsx` 命名規範。
- **樣式管理整合**：將卷軸與全域樣式整合至 `globals.css`。
- **安全漏洞修復**：已將 Next.js 升級至 16.2.4，解決已知的高風險安全漏洞。

## 使用技術

- [Next.js 16](https://nextjs.org/)（React 19，加強版 React 框架）

## 開發環境設置

建議使用 [VSCode](https://code.visualstudio.com/) 搭配 [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- Node.js 20.9 以上版本（Next.js 16.2 需符合的新最低版本要求）

## 快速開始

**專案設置（Project setup）**

將專案複製到本地端

```sh
$ git clone https://github.com/happyloa/next-todolist.git
```

套件安裝

```sh
$ cd next-todolist
$ npm install
```

**執行專案（Start the server）**

```sh
$ npm run dev
```

在瀏覽器上輸入

```
http://localhost:3000/
```

即可在本地端預覽專案

## 專案結構 (src)

位於 `src` 目錄下：

### 頁面路徑 (App Router)

位於 `src/app`

```
src/app
├── (auth)
│   ├── login/page.jsx                   豋入頁面（/login）
│   └── register/page.jsx                註冊頁面（/register）
├── todos/page.jsx                       待辦事項清單列表頁面（/todos）
├── favicon.ico                          網站圖示
├── globals.css                          網站整體樣式（包含卷軸樣式）
└── layout.jsx                           網站整體架構設定，包含 Google Fonts 與 Metadata
```

### 元件檔案 (Components)

位於 `src/components`

```
src/components
├── forms
│   ├── login-form.jsx                   登入表單元件
│   ├── register-form.jsx                註冊表單元件
│   └── form-style.module.css            表單共用樣式
├── todos
│   ├── todo-input.jsx                   新增待辦事項 input
│   ├── todo-list-content.jsx            待辦清單主容器
│   ├── todo-list-item.jsx               待辦事項列表項
│   └── todo-no-item.jsx                 無事項時的裝飾元件
├── logo-and-deco-image.jsx              頁面裝飾圖片元件
└── logo-and-deco-image.module.css       裝飾元件樣式
```

### 工具與邏輯 (Lib)

位於 `src/lib`

```
src/lib
├── api.js                               API 請求封裝 (Fetch API)
├── utils.js                             通用工具函式 (Cookie 管理等)
└── show-alert.js                        自定義 Sweet Alert 2 提示工具
```

### 其他

- `src/proxy.js`: 路徑守衛與認證邏輯 (Middleware)

## 使用的套件 & 工具

- [Next.js 16.2.4](https://nextjs.org/) with [React 19.2.5](https://react.dev/)
- [sweetalert2 11.26.24](https://sweetalert2.github.io/)
- [Antigravity AI](https://google.com) (Restructuring & Optimization)
