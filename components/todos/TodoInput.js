"use client";

import { useState } from "react";
import axios from "axios";

import styles from "./TodoInput.module.css";

export default function TodoInput({ onTodoAdded }) {
  const [newTodo, setNewTodo] = useState("");

  // 新增待辦事項的函數
  const addTodo = async () => {
    if (!newTodo.trim()) return; // 若輸入為空則不執行

    try {
      // 發送 POST 請求來新增待辦事項
      await axios.post("https://todolist-api.hexschool.io/todos", {
        content: newTodo.trim(),
      });
      console.log("成功新增待辦事項：" + newTodo.trim());
      setNewTodo(""); // 清空輸入欄位

      // 觸發父元件的回調函數
      onTodoAdded();
    } catch (error) {
      // 錯誤處理
      console.error(
        "新增待辦事項失敗:",
        error.response?.data?.message || error.message
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
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          addTodo();
        }}
        className={styles.addButton}>
        <img src="/icons/plus.svg" alt="新增待辦事項" />
      </a>
    </div>
  );
}
