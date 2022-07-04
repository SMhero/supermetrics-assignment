import { FC, ChangeEvent } from "react";

import styles from "./styles.css";

interface IProps {
  label?: string;
  name?: unknown;
  onChange: (event: ChangeEvent<HTMLInputElement>, formKey?: unknown) => void;
  placeholder?: string;
  required?: boolean;
  type?: "email" | "text" | "number" | "password";
  value?: string | number;
}

const Input: FC<IProps> = ({
  name = undefined,
  label = undefined,
  onChange,
  placeholder = "",
  required = false,
  type = "text",
  value,
}) => (
  <label className={styles.root}>
    {label && <span className={styles.label}>{label}</span>}
    <input
      className={styles.input}
      onChange={event => onChange(event, name)}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  </label>
);

export default Input;
