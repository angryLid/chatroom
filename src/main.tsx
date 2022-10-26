import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "./components/Loading";
import "./index.css";
import { Admin, Clipboard } from "./pages";
import { store } from "./store";
const root = document.getElementById("root") || document.createElement("div");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clipboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
