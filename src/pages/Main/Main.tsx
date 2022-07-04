import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/Layout";
import Button from "components/Button/Button";

import styles from "./styles.css";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Button
        className={styles.button}
        onClick={() => navigate("/login", { replace: true })}
        type="button"
      >
        Go to login!
      </Button>
    </Layout>
  );
};

export default Main;
