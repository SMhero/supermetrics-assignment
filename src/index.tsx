import { FC, StrictMode } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import store from "./store";
import App from "./components/App/App";

const Root: FC = () => (
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>
);

createRoot(document.getElementById("root") as Element).render(<Root />);
