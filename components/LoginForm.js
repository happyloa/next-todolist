"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiFetch } from "@/lib/api";
import { setCookie } from "@/lib/utils";
import showAlert from "./showAlert";

import styles from "./FormStyle.module.css";

export default function LoginForm() {
  const router = useRouter();

  // 使用 useState 來管理 email 和 password 的狀態
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 使用 useState 來管理錯誤狀態
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // 使用 useState 來追踪欄位是否被修改
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);


  // 處理 input 事件，根據欄位是否為空設定錯誤狀態
  const handleInput = (field) => {
    if (field === "email") {
      setEmailTouched(true);
      setEmailError(emailTouched && !email);
    } else if (field === "password") {
      setPasswordTouched(true);
      setPasswordError(passwordTouched && !password);
    }
  };

  // 處理提交表單邏輯
  const handleSubmit = async () => {
    // 設置所有欄位為 touched 狀態
    setEmailTouched(true);
    setPasswordTouched(true);

    // 驗證 email 和 password 欄位是否為空
    setEmailError(!email);
    setPasswordError(!password);

    // 如果有任何錯誤，停止提交
    if (emailError || passwordError || !email || !password) {
      return;
    }

    // 如果沒有錯誤，則進行登入請求
    try {
      // 發送 POST 請求到登入端點
      const data = await apiFetch("/users/sign_in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // 從登入回應中獲取 Token 與 nickname，並保存到 Cookie 中
      const { token, nickname } = data;

      setCookie("hexschoolTodo", token, 1); // 將 Token 存入 cookie
      setCookie("nickname", nickname, 1); // 將暱稱存入 cookie

      // 登入成功顯示提示訊息並跳轉至 /todos
      showAlert(
        "登入成功！",
        "",
        "success",
        "水喔💯，帶我去待辦事項清單吧～"
      ).then(() => {
        router.push("/todos");
      });
    } catch (error) {
      // 處理錯誤並顯示錯誤訊息
      showAlert(
        "錯誤🥲",
        error.data?.message || "登入失敗，請稍後再試",
        "error",
        "QQ好喔"
      );
    }
  };

  return (
    <form className={styles.formControls} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.formControls_txt}>最實用的線上待辦事項服務</h2>

      {/* Email 輸入框 */}
      <label className={styles.formControls_label} htmlFor="email">
        Email
      </label>
      <input
        className={styles.formControls_input}
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onInput={() => handleInput("email")}
        placeholder="請輸入 email"
        required
      />
      {emailTouched && emailError && <span>此欄位不可留空</span>}

      {/* 密碼輸入框 */}
      <label className={styles.formControls_label} htmlFor="password">
        密碼
      </label>
      <input
        className={styles.formControls_input}
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onInput={() => handleInput("password")}
        placeholder="請輸入密碼"
        required
      />
      {passwordTouched && passwordError && <span>此欄位不可留空</span>}

      {/* 登入按鈕 */}
      <input
        className={styles.formControls_btnSubmit}
        type="button"
        value="登入"
        onClick={handleSubmit}
      />

      {/* 跳轉到註冊帳號頁面 */}
      <Link
        href="/register"
        className={`${styles["formControls_btnLink"]} ${styles["link-underlined"]}`}>
        註冊帳號
      </Link>
    </form>
  );
}
