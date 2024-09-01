import styles from "./TodoNoItem.module.css"; // 匯入 CSS Modules

export default function TodoNoItem() {
  return (
    <div className={styles.noItem}>
      <h2>目前尚無待辦事項</h2>
      <img src="/image/empty-deco.webp" alt="無待辦事項裝飾圖片" />
    </div>
  );
}
