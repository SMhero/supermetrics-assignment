import LoginForm from "forms/Login/Login";
import Layout from "components/Layout/Layout";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.css";

const Login = () => {
  const [searchParams] = useSearchParams();
  const authParam = searchParams.get("auth");

  return (
    <Layout>
      {authParam && (
        <div className={styles.info}>
          Your token is expired. You need to log in again.
        </div>
      )}
      <h1 className={styles.title}>Login</h1>
      <LoginForm />
    </Layout>
  );
};

export default Login;
