"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

import styles from "./TodoListItem.module.css";

const TodoListItem = forwardRef((props, ref) => {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // 獲取待辦事項列表
  const getTodos = async () => {
    try {
      const response = await axios.get(
        "https://todolist-api.hexschool.io/todos"
      );
      setTodos(response.data.data);
      console.log("已獲取待辦事項清單");
    } catch (error) {
      console.error("無法獲取待辦事項列表:", error.message);
    }
  };

  // 使用 useImperativeHandle 來讓父元件可以調用 getTodos 方法
  useImperativeHandle(ref, () => ({
    getTodos,
  }));

  // 刪除指定 ID 的待辦事項
  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    try {
      await axios.delete(`https://todolist-api.hexschool.io/todos/${id}`);
      console.log(
        `已刪除待辦事項：${todoToDelete.content}，ID 為：${todoToDelete.id}`
      );
      getTodos();
    } catch (error) {
      console.error(
        `刪除待辦事項失敗：${todoToDelete.content}，ID 為：${todoToDelete.id}，錯誤訊息：${error.message}`
      );
    }
  };

  // 切換指定 ID 的待辦事項的完成狀態
  const toggleStatus = async (id) => {
    const todoToToggle = todos.find((todo) => todo.id === id);
    try {
      await axios.patch(`https://todolist-api.hexschool.io/todos/${id}/toggle`);
      console.log(`待辦事項：「${todoToToggle.content}」已切換狀態`);
      getTodos();
    } catch (error) {
      console.error(
        `切換待辦事項狀態失敗：「${todoToToggle.content}」，ID 為：${todoToToggle.id}，錯誤訊息：${error.message}`
      );
    }
  };

  // 根據選取的 tab 過濾待辦事項列表
  const filteredTodos = todos.filter((todo) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return !todo.status;
    if (activeTab === "completed") return todo.status;
  });

  // 計算待完成的待辦事項數量
  const pendingTodosCount = todos.filter((todo) => !todo.status).length;

  // 計算已完成的待辦事項數量
  const completedTodosCount = todos.filter((todo) => todo.status).length;

  // 元件掛載後，初次獲取待辦事項列表
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={styles.todoList_list}>
      <ul className={styles.todoList_tab}>
        {/* 根據 activeTab 動態添加 active class，並切換 tab */}
        <li>
          <a
            href="#"
            className={activeTab === "all" ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("all");
            }}>
            全部
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeTab === "pending" ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("pending");
            }}>
            待完成
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeTab === "completed" ? styles.active : ""}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("completed");
            }}>
            已完成
          </a>
        </li>
      </ul>
      <div className={styles.todoList_items}>
        <ul className={styles.todoList_item}>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <label className={styles.todoList_label}>
                <input
                  className={styles.todoList_input}
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleStatus(todo.id)}
                />
                <span>{todo.content}</span>
              </label>
              <img
                src="/icons/delete.svg"
                alt="刪除待辦事項"
                onClick={() => deleteTodo(todo.id)}
              />
            </li>
          ))}
        </ul>
        <div className={styles.todoList_statistics}>
          <p>
            {pendingTodosCount} 個待完成項目 | {completedTodosCount}{" "}
            個已完成項目
          </p>
        </div>
      </div>
    </div>
  );
});

export default TodoListItem;
