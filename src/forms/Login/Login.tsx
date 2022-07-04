import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import useFormFields from "hooks/useFormFields";
import { login } from "api/login";
import useTypedDispatch from "hooks/useTypedDispatch";
import useTypedSelector from "hooks/useTypedSelector";
import Button from "components/Button/Button";

import styles from "./styles.css";

export interface ILoginValues {
  name: string;
  email: string;
}

const Login = () => {
  const dispatch = useTypedDispatch();
  const { status } = useTypedSelector(state => state.user);
  const navigate = useNavigate();

  const { values, onChange } = useFormFields<ILoginValues>({
    email: "",
    name: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(login(values)).then(() => {
      navigate("/posts", { replace: true });
    });
  };

  return (
    <div className={styles.root}>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Input
          label="Name"
          name="name"
          onChange={event => onChange(event, "name")}
          required
          type="text"
          value={values.name}
        />
        <br />
        <Input
          label="E-mail"
          name="email"
          onChange={event => onChange(event, "email")}
          required
          type="email"
          value={values.email}
        />
        <div className={styles.submit}>
          <Button
            className={styles.submitBtn}
            disabled={status === "pending"}
            type="submit"
          >
            {status === "pending" ? "Loading..." : "Log in"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
