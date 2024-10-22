import { Solution } from "@/pages/Solution/index";

import { Layout } from "./Layout";
import { Chat } from "@/pages/Chat/index";

export default {
  path: "/chat",
  element: <Layout />,
  children: [
    {
      path: "/chat/solution",
      element: <Solution />,
    },
    {
      path: "/chat/solution/:id",
      element: <Solution />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/chat/:id",
      element: <Chat />,
    },
  ],
};
