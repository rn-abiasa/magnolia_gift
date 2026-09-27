import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Cover from "./pages/cover";
import Memories from "./pages/memories";
import SpecialMessage from "./pages/specialMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cover />,
  },
  {
    path: "/memories",
    element: <Memories />,
  },
  {
    path: "/special-message",
    element: <SpecialMessage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
