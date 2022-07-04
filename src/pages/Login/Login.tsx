import { Navigate, useSearchParams } from "react-router-dom";
import useTypedSelector from "hooks/useTypedSelector";
import LoginForm from "forms/Login/Login";
import Layout from "components/Layout/Layout";

import styles from "./styles.css";

const Login = () => {
  const { data } = useTypedSelector(state => state.user);
  const [searchParams] = useSearchParams();

  if (data?.slToken) {
    return <Navigate to="/posts" replace />;
  }

  return (
    <Layout>
      {searchParams.get("token") && (
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
