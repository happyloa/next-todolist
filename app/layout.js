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
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant" className={notoSansTC.className}>
      <body>{children}</body>
    </html>
  );
}
