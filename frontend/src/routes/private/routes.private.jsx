import { Solution } from "@/pages/Solution/index";

import { Layout } from "./Layout";
import { Chat } from "@/pages/Chat/index";
import { Files } from "@/pages/Files/index";

export default {
  path: "/chat",
  element: <Layout />,
  children: [
    {
      path: "/chat/files",
      element: <Files />,
    },
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
