import { Noto_Sans_TC } from "next/font/google";

import "./globals.css";
import "./scrollBar.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Next.js To-Do List",
  description: "Next.js To-Do List refactored from Vue3 by Aaron",
  openGraph: {
    images: [
      {
        url: "/og-image.webp", // 用於社交媒體分享時顯示的圖片 URL
        width: 1200, // 圖片的寬度
        height: 630, // 圖片的高度
        alt: "Next.js 14 To-Do List", // 圖片的替代文字
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={notoSansTC.className}>
      <body>{children}</body>
    </html>
  );
}
