import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app";
import books from "./lib/books";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App books={books} />
  </React.StrictMode>
);
