import {
  MessageSquare,
  Bot,
  Search,
  Plus,
  Library,
  StickyNote,
  SquareCheckBig,
} from "lucide-react";
import { Button } from "../Button/index";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useConversation } from "@/contexts/ConversationContext";
import { useEffect, useState } from "react";
import { Sidebar, SidebarMenuButton } from "../ui/sidebar";

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

  //fetch tickets and save into a useState
  const [ticketsResolved, setTicketsResolved] = useState([]);

  // fetch tickets from backend
  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then((response) => response.json())
      .then((data) =>
        setTicketsResolved(
          data.filter((ticket) => ticket.closed_at).map((ticket) => ticket.id)
        )
      );
  }, []);

  if (!conversations.length) return <div></div>;

  return (
    <Sidebar className="z-20">
      <div className="bg-black  tracking-wide h-full">
        <div className="flex flex-col gap-5 h-full">
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

          <div className="flex flex-col gap-5 px-4 flex-1 h-full">
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
                    {conversation.chatId.includes("TASK") ? (
                      ticketsResolved.includes(conversation.chatId) ? (
                        <SquareCheckBig className="min-w-4 w-4" />
                      ) : (
                        <StickyNote className="min-w-4 w-4" />
                      )
                    ) : (
                      <MessageSquare className="min-w-4 w-4" />
                    )}
                    <span
                      className={clsx(
                        "text-xs tracking-wider text-ellipsis overflow-hidden text-nowrap",
                        ticketsResolved.includes(conversation.chatId) &&
                          "line-through"
                      )}
                      title={conversation.title}
                    >
                      {conversation.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-primary" />

          <div className="flex flex-col gap-5 px-4 pb-4">
            <SidebarMenuButton onClick={() => navigate("/chat/files")}>
              <Library size={16} />
              Base de conhecimento
            </SidebarMenuButton>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
