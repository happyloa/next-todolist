"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/axios";

import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoNoItem from "./TodoNoItem";

import styles from "./TodoListContent.module.css";

export default function TodoListContent() {
  const [todos, setTodos] = useState([]);

  // 獲取待辦事項列表
  const getTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data.data);
      console.log("已獲取最新待辦事項清單");
    } catch (error) {
      console.error("無法獲取待辦事項列表:", error.message);
    }
  };

  // 計算是否有待辦事項
  const hasTodos = todos.length > 0;

  // 設定初次加載
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <main className={styles.todoList_Content}>
      <TodoInput onTodoAdded={getTodos} />
      {hasTodos ? (
        <TodoListItem todos={todos} onRefresh={getTodos} />
      ) : (
        <TodoNoItem />
      )}
    </main>
  );
}
