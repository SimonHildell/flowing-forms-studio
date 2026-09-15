import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import "./index.css";

/**
 * Safety net for in-app browsers (LinkedIn, Instagram, Facebook) that start the
 * page with animations frozen: after everything should have finished, force the
 * end state so nothing can be left invisible.
 */
window.setTimeout(() => {
  document.documentElement.classList.add("ffs-anim-fallback");
}, 4000);

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/project/:slug" element={<ProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </HashRouter>,
);
