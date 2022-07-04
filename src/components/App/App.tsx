import { FC } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Login from "pages/Login/Login";
import NoMatch from "pages/NoMatch";
import Main from "pages/Main/Main";
import Posts from "components/Posts/Posts";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import styles from "./styles.css";

const App: FC = () => (
  <main className={styles.root}>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route
        path="posts"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<Posts />} />
        <Route path=":name" element={<Posts />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </main>
);

export default App;
