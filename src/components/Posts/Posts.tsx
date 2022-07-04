import { ChangeEvent, useEffect, useState } from "react";
import {
  createSearchParams,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import debounce from "lodash.debounce";

import { getPosts } from "api/posts";
import useTypedDispatch from "hooks/useTypedDispatch";
import useTypedSelector from "hooks/useTypedSelector";
import usePosts, { TUsersWithPostsCount } from "hooks/usePosts";
import { IPost } from "typings/posts";
import Input from "components/Input/Input";
import Post from "components/Post/Post";
import Button from "components/Button/Button";

import styles from "./styles.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];

const DEBOUNCE_TIMEOUT = 600;

const getFormattedDate = (date: Date) =>
  `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`;

const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { name } = useParams();
  const { getPostsByDate, getUsersWithPostsCount } = usePosts();
  const { data, error } = useTypedSelector(state => state.posts);

  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<TUsersWithPostsCount>([]);

  const onUserSearch = debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
    const userList = name ? getUsersWithPostsCount() : users;
    const newUsers = userList.filter(
      user => target.value.length && user.name.includes(target.value),
    );

    setUsers(!newUsers.length ? getUsersWithPostsCount() : newUsers);
    setPosts(!newUsers.length ? data.posts : posts);
  }, DEBOUNCE_TIMEOUT);

  const onPostSearch = debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
    const newPosts = posts.filter(
      post => target.value.length && post.message.includes(target.value),
    );

    setPosts(!newPosts.length ? data.posts : newPosts);
  }, DEBOUNCE_TIMEOUT);

  const onSortButtonClick = (isRecent: boolean) => {
    setPosts(getPostsByDate(isRecent, name));
  };

  const onUserClick = (userName: string) => {
    setPosts(data.posts.filter(post => post.fromName === userName));
    navigate(`/posts/${userName}`, { replace: true });
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    setPosts(getPostsByDate(true, name));
    setUsers(getUsersWithPostsCount(name));
  }, [data.posts, getPostsByDate, getUsersWithPostsCount, name]);

  if (error === "Invalid SL Token") {
    navigate(
      {
        pathname: "/login",
        search: `?${createSearchParams({
          token: "expired",
        })}`,
      },
      { replace: true },
    );
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Posts</h1>
      {data.posts.length ? (
        <div className={styles.wrapper}>
          <div>
            <Input
              onChange={onUserSearch}
              label="User name"
              placeholder="Type the user name..."
            />
            <div className={styles.usersList}>
              {users.map(user => (
                <Button
                  className={styles.button}
                  key={user.name}
                  onClick={() => onUserClick(user.name)}
                >
                  {user.name}
                  <span className={styles.count}>{user.postsCount}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.postsListHead}>
              <Input
                onChange={onPostSearch}
                label="Post content"
                placeholder="Type potential post text..."
              />
              <div className={styles.sortButtons}>
                <button onClick={() => onSortButtonClick(true)}>Recent</button>
                <button onClick={() => onSortButtonClick(false)}>Latest</button>
              </div>
            </div>
            <div className={styles.postsList}>
              {posts.map(post => (
                <Post
                  key={post.id}
                  createdTime={getFormattedDate(post.createdTime)}
                  message={post.message}
                  fromName={post.fromName}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Loading...</div>
      )}
      <Outlet />
    </div>
  );
};

export default Posts;
