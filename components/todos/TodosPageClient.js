"use client";

import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import showAlert from "@/components/showAlert";
import TodoListContent from "@/components/todos/TodoListContent";
import { deleteCookies } from "@/lib/utils";
import styles from "@/app/todos/todosPage.module.css";

export default function TodosPageClient({ initialNickname }) {
  const router = useRouter();


  // 處理登出邏輯
  const handleLogout = async () => {
    try {
      const response = await axios.post("/users/sign_out");
      console.log(response.data.message);
      deleteCookies();

      // 取消註冊全局的 Authorization Token
      delete axios.defaults.headers.common["Authorization"];

      showAlert("已成功登出，下次再見👋", "", "success", "ㄅㄅ👋👋").then(
        () => {
          router.push("/login");
        }
      );
    } catch (error) {
      showAlert(
        "登出失敗",
        error.response?.data?.message || "請稍後再試",
        "error",
        "OK"
      );
    }
  };

  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <img
          src="/image/logo.webp"
          alt="網站 Logo"
          className={styles.logo}
        />
        <ul className={styles.userNameAndLogout}>
          <li className={styles.userName}>{initialNickname}的待辦清單</li>
          <li className={styles.logout} onClick={handleLogout}>
            登出
          </li>
        </ul>
      </nav>
      <TodoListContent />
    </section>
  );
}
