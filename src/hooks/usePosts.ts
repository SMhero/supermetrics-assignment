import { useCallback } from "react";
import { IPost } from "typings/posts";
import useTypedSelector from "./useTypedSelector";

export type TUsersWithPostsCount = {
  name: string;
  postsCount: number;
}[];

interface IUsePosts {
  getPostsByDate: (isRecent: boolean, userName?: string) => IPost[];
  getUsersWithPostsCount: (userName?: string) => TUsersWithPostsCount;
}

const usePosts = (): IUsePosts => {
  const {
    data: { posts },
  } = useTypedSelector(state => state.posts);

  const getPostsByDate = useCallback(
    (isRecent: boolean, userName?: string) => {
      const newPosts = posts
        .slice()
        .sort((a, b) =>
          isRecent
            ? b.createdTime.getTime() - a.createdTime.getTime()
            : a.createdTime.getTime() - b.createdTime.getTime(),
        );

      if (!userName) {
        return newPosts;
      }

      return newPosts.filter(post => post.fromName === userName);
    },
    [posts],
  );

  const getUsersWithPostsCount = useCallback(
    (userName?: string) => {
      let uniqueUsers = [...new Set(posts.map(post => post.fromName))];

      if (userName) {
        uniqueUsers = uniqueUsers.filter(name => name === userName);
      }

      return uniqueUsers
        .map(name => ({
          name,
          postsCount: posts.reduce((acc, post) => {
            if (post.fromName === name) {
              acc++;
            }

            return acc;
          }, 0),
        }))
        .sort((a, b) => {
          const nameFirst = a.name.split("_")[0];
          const nameSecond = b.name.split("_")[0];

          const idFirst = Number(a.name.split("_")[1]);
          const idSecond = Number(b.name.split("_")[1]);

          return nameFirst.localeCompare(nameSecond) || idFirst - idSecond;
        });
    },
    [posts],
  );

  return {
    getPostsByDate,
    getUsersWithPostsCount,
  };
};

export default usePosts;
