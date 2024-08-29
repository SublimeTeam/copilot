import { createBrowserRouter } from "react-router-dom";

import { Solution } from "../pages/Solution";
import publicRoutes from "./public/routes.public";

export const routes = createBrowserRouter([
  {
    path: "/solution",
    children: [
      {
        path: "/solution",
        element: <Solution />,
      },
    ],
  },
  publicRoutes,
]);
