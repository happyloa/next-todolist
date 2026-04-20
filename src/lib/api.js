import { getCookie } from "./utils";

const BASE_URL = "https://todolist-api.hexschool.io";

/**
 * 集中管理 API 請求的 fetch helper
 * 自動注入 Authorization header（取代 axios interceptor 的功能）
 * @param {string} endpoint - API 路徑，例如 "/users/sign_in"
 * @param {RequestInit} options - fetch 選項（method、body 等）
 * @returns {Promise<any>} 解析後的 JSON 資料
 */
export async function apiFetch(endpoint, options = {}) {
  const token = getCookie("hexschoolTodo");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: token }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 解析回應 JSON（無論成功或失敗都先解析）
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // 拋出含有 data 屬性的 error，方便上層用 error.data?.message 取得訊息
    const error = new Error(data?.message || "請求失敗，請稍後再試");
    error.data = data;
    throw error;
  }

  return data;
}
