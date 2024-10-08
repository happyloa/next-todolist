import Link from "next/link";
import styles from "./LogoAndDecoImage.module.css";

export default function LogoAndDecoImage() {
  return (
    <aside className={styles.aside}>
      <Link href="/login">
        <img
          src="/image/logo.webp"
          alt="網站 Logo"
          className={styles.logo}
        />
      </Link>
      <img
        src="/image/login-and-register.webp"
        alt="登入註冊頁面裝飾圖片"
        className={styles.hideOnMobile}
      />
    </aside>
  );
}
