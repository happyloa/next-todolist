"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import showAlert from "@/components/showAlert";
import TodoListContent from "@/components/todos/TodoListContent";
import { deleteCookies } from "@/lib/utils";
import styles from "@/app/todos/todosPage.module.css";

export default function TodosPageClient({ initialNickname }) {
  const router = useRouter();

  // 處理登出邏輯
  const handleLogout = async () => {
    try {
      await apiFetch("/users/sign_out", { method: "POST" });
      deleteCookies();

      showAlert("已成功登出，下次再見👋", "", "success", "ㄅㄅ👋👋").then(
        () => {
          router.push("/login");
        }
      );
    } catch (error) {
      showAlert(
        "登出失敗",
        error.data?.message || "請稍後再試",
        "error",
        "OK"
      );
    }
  };

  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <Image
          src="/image/logo.webp"
          alt="網站 Logo"
          width={109}
          height={40}
          className={styles.logo}
        />
        <ul className={styles.userNameAndLogout}>
          <li className={styles.userName}>{initialNickname}的待辦清單</li>
          <li>
            <button className={styles.logout} onClick={handleLogout}>
              登出
            </button>
          </li>
        </ul>
      </nav>
      <TodoListContent />
    </section>
  );
}
