import LogoAndDecoImage from "@/components/LogoAndDecoImage";
import LoginForm from "@/components/LoginForm";
import styles from "./loginPage.module.css";

export default function LoginView() {
  return (
    <section className={styles.container}>
      <LogoAndDecoImage />
      <LoginForm />
    </section>
  );
}
