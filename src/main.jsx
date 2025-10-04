import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import Welcome from "./pages/Welcome.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Welcome />
  </StrictMode>,
);
