"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiFetch } from "@/lib/api";
import showAlert from "./showAlert"; // 匯入自定義的 showAlert 函數

import styles from "./FormStyle.module.css";

export default function RegisterForm() {
  const router = useRouter();

  // 使用 useState 來管理 email、nickname、password 和 checkPassword 的狀態
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  // 使用 useState 來管理各欄位錯誤狀態
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState("");

  // 使用 useState 來追踪欄位是否被修改
  const [emailTouched, setEmailTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [checkPasswordTouched, setCheckPasswordTouched] = useState(false);

  // 使用 useEffect 來監控 password 和 checkPassword 的變化
  useEffect(() => {
    if (checkPasswordTouched) {
      setCheckPasswordError(
        !checkPassword
          ? "此欄位不可留空"
          : checkPassword !== password
          ? "與輸入的密碼不符合"
          : ""
      );
    }
  }, [password, checkPassword, checkPasswordTouched]);

  // 處理 input 事件，根據欄位是否為空或不一致設定錯誤狀態
  const handleInput = (field) => {
    switch (field) {
      case "email":
        setEmailTouched(true);
        setEmailError(emailTouched && !email);
        break;
      case "nickname":
        setNicknameTouched(true);
        setNicknameError(nicknameTouched && !nickname);
        break;
      case "password":
        setPasswordTouched(true);
        setPasswordError(passwordTouched && !password);
        break;
      case "checkPassword":
        setCheckPasswordTouched(true);
        break;
    }
  };

  // 處理提交表單邏輯
  const handleSubmit = async () => {
    // 設置所有欄位為 touched 狀態
    setEmailTouched(true);
    setNicknameTouched(true);
    setPasswordTouched(true);
    setCheckPasswordTouched(true);

    // 驗證各欄位是否為空或不一致
    setEmailError(!email);
    setNicknameError(!nickname);
    setPasswordError(!password);
    setCheckPasswordError(
      !checkPassword
        ? "此欄位不可留空"
        : checkPassword !== password
        ? "與輸入的密碼不符合"
        : ""
    );

    // 如果任何欄位有錯誤，則無法發出請求
    if (
      emailError ||
      nicknameError ||
      passwordError ||
      checkPasswordError ||
      !email ||
      !nickname ||
      !password ||
      !checkPassword
    ) {
      return;
    }

    // 如果沒有錯誤，則進行註冊請求
    try {
      // 發送 POST 請求到註冊端點
      await apiFetch("/users/sign_up", {
        method: "POST",
        body: JSON.stringify({ email, password, nickname }),
      });
      // 註冊成功顯示提示訊息並跳轉至登入頁面
      showAlert(
        "恭喜您完成註冊😁",
        "歡迎使用我們的 To-Do List 服務",
        "success",
        "Ya～帶我去登入畫面"
      ).then(() => {
        router.push("/login");
      });
    } catch (error) {
      // 處理錯誤並顯示錯誤訊息
      showAlert(
        "註冊失敗😭😭",
        error.data?.message || error.message,
        "error",
        "我真的會謝"
      );
    }
  };

  return (
    <form className={styles.formControls} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.formControls_txt}>註冊帳號</h2>

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

      {/* 暱稱輸入框 */}
      <label className={styles.formControls_label} htmlFor="nickname">
        您的暱稱
      </label>
      <input
        className={styles.formControls_input}
        type="text"
        name="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        onInput={() => handleInput("nickname")}
        placeholder="請輸入您的暱稱"
        required
      />
      {nicknameTouched && nicknameError && <span>此欄位不可留空</span>}

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

      {/* 再次輸入密碼框 */}
      <label className={styles.formControls_label} htmlFor="check-password">
        再次輸入密碼
      </label>
      <input
        className={styles.formControls_input}
        type="password"
        name="check-password"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
        onInput={() => handleInput("checkPassword")}
        placeholder="請再次輸入密碼"
        required
      />
      {checkPasswordTouched && checkPasswordError && (
        <span>{checkPasswordError}</span>
      )}

      {/* 註冊按鈕 */}
      <input
        className={styles.formControls_btnSubmit}
        type="button"
        value="註冊帳號"
        onClick={handleSubmit}
      />

      {/* 跳轉到登入頁面 */}
      <Link
        href="/login"
        className={`${styles["formControls_btnLink"]} ${styles["link-underlined"]}`}>
        登入
      </Link>
    </form>
  );
}
