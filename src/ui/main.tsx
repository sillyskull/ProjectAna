import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // Correct module
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginCardWithForm } from "@/components/login-form";


const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found. Ensure there is an element with id 'root' in your HTML.");
}

const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginCardWithForm />,
  },
]);

// Rendering the app
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
