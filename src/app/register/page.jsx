import LogoAndDecoImage from "@/components/logo-and-deco-image";
import RegisterForm from "@/components/forms/register-form";
import styles from "./register-page.module.css";

export default function Register() {
  return (
    <section className={styles.container}>
      <LogoAndDecoImage />
      <RegisterForm />
    </section>
  );
}
