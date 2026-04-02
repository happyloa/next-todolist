import Image from "next/image";
import Link from "next/link";
import styles from "./LogoAndDecoImage.module.css";

export default function LogoAndDecoImage() {
  return (
    <aside className={styles.aside}>
      <Link href="/login">
        <Image
          src="/image/logo.webp"
          alt="網站 Logo"
          width={109}
          height={40}
          className={styles.logo}
          priority
        />
      </Link>
      <Image
        src="/image/login-and-register.webp"
        alt="登入註冊頁面裝飾圖片"
        width={360}
        height={480}
        className={styles.hideOnMobile}
        priority
      />
    </aside>
  );
}
