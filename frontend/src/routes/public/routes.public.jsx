import { Contact } from "@/pages/Contact/index";
import { Home } from "@/pages/Home/index";
import { Project } from "@/pages/Project/index";

import { Layout } from "./Layout";
import { Login } from "@/pages/Login/index";

export default {
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/about-project",
      element: <Project />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
  ],
};
