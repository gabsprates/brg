import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app";
import { books } from "./lib/books";
import { makeService } from "./lib/services";

const service = makeService({ storage: localStorage });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App books={books} service={service} />
  </React.StrictMode>
);
