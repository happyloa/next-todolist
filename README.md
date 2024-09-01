![](https://i.imgur.com/0wgSHAE.png)

# 六角 Todolist API 重構為 Next.js 14

此專案為六角學院 2024 Vue 前端新手營最終挑戰之成品，使用 ChatGPT 4o 重構為 Next.js 14

- [線上部署連結](https://next-todolist.worksbyaaron.com/login)
- [設計稿](https://www.figma.com/design/MFSk8P5jmmC2ns9V9YeCzM/TodoList?node-id=0-1&t=hgswJMZPd4ttA8R8-0)
- [API 文件](https://todolist-api.hexschool.io/doc/#/)
- [完整過程錄影](https://www.youtube.com/watch?v=w0xcsgtnoFA)

## 使用技術

- [Next.js 14](https://nextjs.org/)（React 加強版）

## 開發環境設置

建議使用 [VSCode](https://code.visualstudio.com/) 搭配 [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

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

## 頁面路徑（Router Link）

位於 `app`

結構說明

```
app
├── login                                豋入頁面（/login）
├── register                             註冊頁面（/register）
├── todos                                待辦事項清單列表頁面（/todos）
├── favicon.ico                          網站圖示
├── globals.css                          網站整體樣式，有做簡單的 reset
├── layout.js                            網站整體架構設定，更改字型為思源黑體，並設定 og 圖片
└── scrollBar.css                        客製化頁面卷軸樣式
```

## 元件檔案（Components）

位於 `components`

結構說明

```
src/components
└── todos
    ├── TodoInput.js                     用來新增待辦事項的 input 元件
    ├── TodoInput.module.css             用來新增待辦事項的 input 元件的樣式
    ├── TodoListContent.js               代辦事項清單整體容器
    ├── TodoListContent.module.css       代辦事項清單整體容器的樣式
    ├── TodoListItem.js                  代辦事項列表
    ├── TodoListItem.module.css          代辦事項列表的樣式
    ├── TodoNoItem.js                    沒有代辦事項時，顯示這個裝飾元件
    └── TodoNoItem.module.css            裝飾元件的樣式
├── FormStyle.module.css                 表單元件（登入 & 註冊）的共用樣式
├── LoginForm.js                         登入表單
├── LogoAndDecoImage.js                  登入&註冊表單頁面裝飾元件
├── LogoAndDecoImage.module.css          登入&註冊表單頁面裝飾元件的樣式
├── RegisterForm.js                      註冊表單
└── showAlert.js                         獨立出來的 Sweet Alert 2 函數
```

## 靜態檔案

位於 `public`

結構說明

```
public
├── icons                                網站會用到的圖示
├── image                                網站會用到的圖片
└── og-image.webp                        社群媒體上的顯示縮圖
```

## 使用的套件 & 工具

- [axios](https://axios-http.com/)
- [sweetalert2](https://sweetalert2.github.io/)
- [ChatGPT 4o](https://openai.com/)
