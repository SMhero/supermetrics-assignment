import { FC } from "react";

import styles from "./styles.css";

interface IProps {
  createdTime: string;
  fromName: string;
  message: string;
}

const Post: FC<IProps> = ({ createdTime, message, fromName }) => (
  <div className={styles.post}>
    <p className={styles.date}>{createdTime}</p>
    <p>{message}</p>
    <p className={styles.author}>
      Author: <span className={styles.name}>{fromName}</span>
    </p>
  </div>
);

export default Post;
