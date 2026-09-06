import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { useAuthStore } from "./stores/authStore";

function Root() {
  const checkAuth = useAuthStore(
    (state) => state.checkAuth
  );

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <App />;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);