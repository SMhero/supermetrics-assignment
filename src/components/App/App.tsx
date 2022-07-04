import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "pages/Login/Login";
import NoMatch from "pages/NoMatch";
import Main from "pages/Main/Main";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import styles from "./styles.css";

const App: FC = () => (
  <main className={styles.root}>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <div>Posts</div>
          </ProtectedRoute>
        }
      >
        <Route index element={<div>Posts</div>} />
        <Route path=":name" element={<div>Posts</div>} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  </main>
);

export default App;
