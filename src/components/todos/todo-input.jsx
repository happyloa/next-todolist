"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

import styles from "./todo-input.module.css";

export default function TodoInput({ onTodoAdded }) {
  const [newTodo, setNewTodo] = useState("");

  // 新增待辦事項的函數
  const addTodo = async () => {
    if (!newTodo.trim()) return; // 若輸入為空則不執行

    try {
      // 發送 POST 請求來新增待辦事項
      await apiFetch("/todos", {
        method: "POST",
        body: JSON.stringify({ content: newTodo.trim() }),
      });
      setNewTodo(""); // 清空輸入欄位

      // 觸發父元件的回調函數
      onTodoAdded(); // 通知 TodoListItem 進行更新
    } catch (error) {
      // 錯誤處理
      console.error(
        "新增待辦事項失敗:",
        error.data?.message || error.message
      );
    }
  };

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        placeholder="新增待辦事項"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={addTodo}
        className={styles.addButton}
        aria-label="新增待辦事項">
        <img src="/icons/plus.svg" alt="新增待辦事項" />
      </button>
    </div>
  );
}
