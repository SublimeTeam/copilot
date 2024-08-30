import { createBrowserRouter } from "react-router-dom";

import publicRoutes from "./public/routes.public";
import privateRoutes from "./private/routes.private";

export const routes = createBrowserRouter([privateRoutes, publicRoutes]);
