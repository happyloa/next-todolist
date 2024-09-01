import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import showAlert from "../components/showAlert"; // 匯入自定義的 showAlert 函數
import styles from "./FormStyle.module.css";

export default function LoginForm() {
  const router = useRouter();

  // 使用 useState 來管理 email 和 password 的狀態
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 使用 useState 來管理錯誤狀態
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // 設定 Cookie 的函數
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  // 處理 input 事件，根據欄位是否為空設定錯誤狀態
  const handleInput = (field) => {
    if (field === "email") {
      setEmailError(!email);
    } else if (field === "password") {
      setPasswordError(!password);
    }
  };

  // 處理提交表單邏輯
  const handleSubmit = async () => {
    // 驗證 email 和 password 欄位是否為空
    setEmailError(!email);
    setPasswordError(!password);

    // 如果沒有錯誤，則進行登入請求
    if (!emailError && !passwordError) {
      try {
        // 發送 POST 請求到登入端點
        const response = await axios.post(
          "https://todolist-api.hexschool.io/users/sign_in",
          {
            email,
            password,
          }
        );

        // 從登入回應中獲取 Token 與 nickname，並保存到 Cookie 中，且顯示在 console 上
        const { token, nickname } = response.data;

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
          error.response?.data?.message || "登入失敗，請稍後再試",
          "error",
          "QQ好喔"
        );
      }
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
      {emailError && <span>此欄位不可留空</span>}

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
      {passwordError && <span>此欄位不可留空</span>}

      {/* 登入按鈕 */}
      <input
        className={styles.formControls_btnSubmit}
        type="button"
        value="登入"
        onClick={handleSubmit}
      />

      {/* 跳轉到註冊帳號頁面 */}
      <a
        href="/register"
        className={`${styles.formControls_btnLink} link-underlined`}>
        註冊帳號
      </a>
    </form>
  );
}
