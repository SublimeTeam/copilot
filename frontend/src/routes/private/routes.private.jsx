import { Solution } from "@/pages/Solution/index";

import { Layout } from "./Layout";
import { Chat } from "@/pages/Chat/index";
import { DocumentEmbedding } from "@/pages/DocEmbed/index";

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
      path: "/solution/chat/:id",
      element: <Chat />,
    },
    {
      path: "/solution/doc-embed",
      element: <DocumentEmbedding />,
    },
  ],
};
