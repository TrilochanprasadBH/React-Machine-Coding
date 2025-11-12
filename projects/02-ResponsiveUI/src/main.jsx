import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// ✅ Always use alias
import "@shared/base.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
