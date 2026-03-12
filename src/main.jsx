import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./styles/global.css";

// Performance: Report web vitals in production
if (import.meta.env.PROD) {
  import("./utils/webVitals.js").then(({ reportWebVitals }) => {
    reportWebVitals(console.log);
  });
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0F172A",
              color: "#F8FAFC",
              borderRadius: "10px",
              fontSize: "14px",
              fontFamily: "'Poppins', sans-serif",
              padding: "12px 16px",
            },
            success: {
              iconTheme: { primary: "#34D399", secondary: "#0F172A" },
            },
            error: {
              iconTheme: { primary: "#F87171", secondary: "#0F172A" },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
