import { Solution } from "@/pages/Solution/index";
import { Layout } from "./Layout";

export default {
  path: "/solution",
  element: <Layout />,
  children: [
    {
      path: "/solution",
      element: <Solution />,
    },
    {
      path: "/solution/:id",
      element: <Solution />,
    },
  ],
};
