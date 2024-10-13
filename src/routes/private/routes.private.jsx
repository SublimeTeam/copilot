import { Solution } from "@/pages/Solution/index";

import { Layout } from "./Layout";
import { Chat } from "@/pages/Chat/index";

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
    {
      path: "/solution/chat",
      element: <Chat />,
    },
  ],
};
