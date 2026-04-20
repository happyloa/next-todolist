"use client";

import { useState } from "react";
import Image from "next/image";
import { apiFetch } from "@/lib/api";

import styles from "./todo-list-item.module.css";

const TodoListItem = ({ todos, onRefresh }) => {
  const [activeTab, setActiveTab] = useState("all");

  // 刪除指定 ID 的待辦事項
  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    try {
      await apiFetch(`/todos/${id}`, { method: "DELETE" });
      onRefresh();
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
      await apiFetch(`/todos/${id}/toggle`, { method: "PATCH" });
      onRefresh();
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

  return (
    <div className={styles.todoList_list}>
      <ul className={styles.todoList_tab}>
        {/* 根據 activeTab 動態添加 active class，並切換 tab */}
        <li>
          <button
            className={activeTab === "all" ? styles.active : ""}
            onClick={() => setActiveTab("all")}>
            全部
          </button>
        </li>
        <li>
          <button
            className={activeTab === "pending" ? styles.active : ""}
            onClick={() => setActiveTab("pending")}>
            待完成
          </button>
        </li>
        <li>
          <button
            className={activeTab === "completed" ? styles.active : ""}
            onClick={() => setActiveTab("completed")}>
            已完成
          </button>
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
              <button
                className={styles.deleteButton}
                onClick={() => deleteTodo(todo.id)}
                aria-label={`刪除「${todo.content}」`}>
                <Image
                  src="/icons/delete.svg"
                  alt="刪除待辦事項"
                  width={20}
                  height={20}
                />
              </button>
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
};

export default TodoListItem;
