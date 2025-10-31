import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DevWorks from "./pages/DevWorks"; // your new retro dev page
import ArtWorks from "./pages/ArtWorks"; // optional if you have an Art page
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dev" element={<DevWorks />} />
        <Route path="/art" element={<ArtWorks />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
