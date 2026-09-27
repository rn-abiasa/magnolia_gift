import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Cover from "./pages/cover";
import Memories from "./pages/memories";
import SpecialMessage from "./pages/specialMessage";
import ReasonYouAreSpecial from "./pages/reasonYouAreSpecial";
import OurSongs from "./pages/ourSongs";
import Wish from "./pages/wish";

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
  {
    path: "/reason-you-are-special",
    element: <ReasonYouAreSpecial />,
  },
  {
    path: "/our-songs",
    element: <OurSongs />,
  },
  {
    path: "/wish",
    element: <Wish />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
