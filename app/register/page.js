import LogoAndDecoImage from "@/components/LogoAndDecoImage";
import RegisterForm from "@/components/RegisterForm";
import styles from "./registerPage.module.css";

export default function Register() {
  return (
    <section className={styles.container}>
      <LogoAndDecoImage />
      <RegisterForm />
    </section>
  );
}
