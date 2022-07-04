import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";

import styles from "./styles.css";

const App: FC = () => (
  <main className={styles.root}>
    <Routes>
      <Route path="/" element={<div>Main</div>} />
      <Route path="/login" element={<div>Login</div>} />
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
      <Route path="*" element={<div>No match</div>} />
    </Routes>
  </main>
);

export default App;
