import { FC } from "react";
import styles from "./styles.css";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Lyaout: FC<IProps> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

export default Lyaout;
