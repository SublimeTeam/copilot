import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Project } from "../pages/Project";
import { Solution } from "../pages/Solution";

import { Layout } from "./Layout";

export const routes = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/solution',
        element: <Solution />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/about-project',
        element: <Project />
      },
      {
        path: '/contact-us',
        element: <Project />
      },
    ]
  }
])