import LogoAndDecoImage from "@/components/LogoAndDecoImage";
import LoginForm from "@/components/LoginForm";
import styles from "./login-page.module.css";

export default function Login() {
  return (
    <section className={styles.container}>
      <LogoAndDecoImage />
      <LoginForm />
    </section>
  );
}
