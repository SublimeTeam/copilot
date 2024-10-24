import { MessageSquare, Bot, Search, Plus } from "lucide-react";
import { Button } from "../Button/index";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useConversation } from "@/contexts/ConversationContext";
import { useState } from "react";
import { Sidebar } from "../ui/sidebar";

export const AppSidebar = () => {
  const navigate = useNavigate();
  const {
    conversations,
    activeConversationId,
    createNewConversation,
    setActiveConversationId,
  } = useConversation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!conversations.length) return <div></div>;

  return (
    <Sidebar>
      <div className="bg-black  tracking-wide">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center text-muted-foreground gap-2">
              <Bot
                color="white"
                size={32}
                className="p-1.5 bg-primary rounded-md"
              />
              <span className="text-sm  ">Copiloto</span>
            </div>
            <Button
              onClick={createNewConversation}
              size="sm"
              className="max-w-40 rounded-md"
              title="Criar nova conversa"
            >
              <Plus size={16} />
            </Button>
          </div>

          <hr className="border-primary" />

          <div className="flex flex-col gap-5 px-4">
            <label className=" flex items-center gap-2 border border-primary rounded-md focus-within:border-gray-300/20 bg-primary">
              <Search size={18} className="ml-4 text-muted-foreground" />
              <input
                placeholder="Pesquisar..."
                className="p-2 bg-transparent focus:outline-none w-full placeholder:text-muted-foreground text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <div>
              <h4 className="indent-2  text-muted-foreground text-xs font-bold  mb-3">
                Recentes
              </h4>
              <ul className="list-none p-0 m-0">
                {filteredConversations.map((conversation) => (
                  <li
                    key={conversation.chatId}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-1 mb-0.5 rounded-sm hover:bg-primary text-muted-foreground cursor-pointer relative",
                      {
                        "text-white":
                          conversation.chatId === activeConversationId,
                      }
                    )}
                    onClick={() => {
                      setActiveConversationId(conversation.chatId);
                      navigate(`${conversation.chatId}`);
                    }}
                  >
                    <MessageSquare className="min-w-4 w-4" />
                    <span
                      className="text-xs tracking-wider text-ellipsis overflow-hidden text-nowrap"
                      title={conversation.title}
                    >
                      {conversation.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
