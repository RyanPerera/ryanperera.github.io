import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DevWorks from "./pages/DevWorks"; // your new retro dev page
import ArtWorks from "./pages/ArtWorks"; // optional if you have an Art page
import Resume from "./pages/Resume";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const redirectedPath = params.get("p");
if (redirectedPath) {
  const decodedPath = redirectedPath.replace(/~and~/g, "&");
  const redirectedQuery = params.get("q");
  const decodedQuery = redirectedQuery
    ? `?${redirectedQuery.replace(/~and~/g, "&")}`
    : "";
  const restoredUrl = `${decodedPath}${decodedQuery}${window.location.hash}`;
  window.history.replaceState(null, "", restoredUrl);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dev" element={<DevWorks />} />
        <Route path="/art" element={<ArtWorks />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
