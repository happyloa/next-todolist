"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import TodoInput from "./TodoInput";
import TodoListItem from "./TodoListItem";
import TodoNoItem from "./TodoNoItem";

import styles from "./TodoListContent.module.css";

export default function TodoListContent() {
  const [todos, setTodos] = useState([]);
  const todoListItemRef = useRef(null);

  // 檢查是否有待辦事項
  const checkTodos = async () => {
    try {
      const response = await axios.get(
        "https://todolist-api.hexschool.io/todos"
      );
      setTodos(response.data.data);
      console.log("已檢查待辦事項列表");
    } catch (error) {
      console.error("無法檢查待辦事項列表:", error.message);
    }
  };

  // 計算是否有待辦事項
  const hasTodos = todos.length > 0;

  // 當接收到 TodoInput 發出的事件時，觸發 TodoListItem 的 getTodos 方法
  const handleTodoAdded = () => {
    if (todoListItemRef.current) {
      todoListItemRef.current.getTodos(); // 觸發 TodoListItem 元件內的 getTodos 方法
    }
  };

  // 設定定時器，每 1.5 秒檢查一次待辦事項
  useEffect(() => {
    checkTodos(); // 初次檢查待辦事項
    const interval = setInterval(checkTodos, 1500); // 每 1.5 秒檢查一次

    return () => {
      clearInterval(interval); // 在元件卸載時清除定時器
    };
  }, []);

  return (
    <main className={styles.todoList_Content}>
      <TodoInput onTodoAdded={handleTodoAdded} />
      {hasTodos ? <TodoListItem ref={todoListItemRef} /> : <TodoNoItem />}
    </main>
  );
}
