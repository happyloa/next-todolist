import LogoAndDecoImage from "@/components/logo-and-deco-image";
import LoginForm from "@/components/forms/login-form";
import styles from "./login-page.module.css";

export default function Login() {
  return (
    <section className={styles.container}>
      <LogoAndDecoImage />
      <LoginForm />
    </section>
  );
}
