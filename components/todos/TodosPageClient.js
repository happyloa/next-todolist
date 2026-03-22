"use client";

import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import showAlert from "@/components/showAlert";
import TodoListContent from "@/components/todos/TodoListContent";
import styles from "@/app/todos/todosPage.module.css";

export default function TodosPageClient({ initialNickname }) {
  const router = useRouter();

  // 刪除所有 Cookie
  const deleteAllCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie.replace(
        /=.*/,
        "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
      );
    });
  };

  // 處理登出邏輯
  const handleLogout = async () => {
    try {
      const response = await axios.post("/users/sign_out");
      console.log(response.data.message);
      deleteAllCookies();

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
