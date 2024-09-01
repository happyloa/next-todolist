"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import showAlert from "@/components/showAlert"; // 匯入自定義的 showAlert 函數

import TodoListContent from "@/components/todos/TodoListContent";

import styles from "./todosPage.module.css";

export default function TodosPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  // 讀取 Cookie 中指定名稱的值
  const getCookie = (name) => {
    const regex = new RegExp(
      `(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
    );
    return document.cookie.replace(regex, "$1") || null;
  };

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
      const response = await axios.post(
        "https://todolist-api.hexschool.io/users/sign_out"
      );
      console.log(response.data.message); // 顯示登出回應
      deleteAllCookies(); // 刪除所有 Cookie

      // 取消註冊全局的 Authorization Token
      delete axios.defaults.headers.common["Authorization"];

      showAlert("已成功登出，下次再見👋", "", "success", "ㄅㄅ👋👋").then(
        () => {
          router.push("/login"); // 登出後跳轉至登入畫面
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

  // 在元件掛載後檢查 Token，並取得用戶暱稱
  useEffect(() => {
    const token = getCookie("hexschoolTodo"); // 檢查是否有 Token

    if (!token) {
      // 如果沒有 Token，顯示警告並跳轉至登入頁面
      showAlert(
        "抓到！",
        "沒登入還想進來啊？下去吧！滾！",
        "warning",
        "被抓到惹ㄎㄎ"
      ).then(() => {
        router.push("/login");
      });
    } else {
      axios.defaults.headers.common["Authorization"] = token; // 為所有 API 加上 Authorization Token
      setNickname(getCookie("nickname")); // 從 Cookie 中讀取暱稱
    }
  }, []);

  return (
    <section className={styles.container}>
      <nav className={styles.navbar}>
        <img
          src="/image/logo.webp"
          alt="網站 Logo"
          className={styles.logo}
        />
        <ul className={styles.userNameAndLogout}>
          <li className={styles.userName}>{nickname}的待辦清單</li>
          <li className={styles.logout} onClick={handleLogout}>
            登出
          </li>
        </ul>
      </nav>
      <TodoListContent />
    </section>
  );
}
