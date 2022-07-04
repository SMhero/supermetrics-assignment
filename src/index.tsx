import { FC, StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import store from "./store";
import App from "./components/App/App";

const Root: FC = () => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

createRoot(document.getElementById("root") as Element).render(<Root />);
