import React from "react";
import ReactDOM from "react-dom";
import MainApp from "./MainApp";
import { Provider as AuthProvider } from "./context/UserContext";

ReactDOM.render(
  <AuthProvider>
    <MainApp />
  </AuthProvider>,
  document.getElementById("root")
);
