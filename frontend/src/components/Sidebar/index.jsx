import { Plus, MessageSquare } from "lucide-react";
import { Button } from "../Button/index";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useConversation } from "@/contexts/ConversationContext";

export const SideBar = () => {
  const navigate = useNavigate();
  const {
    conversations,
    activeConversationId,
    createNewConversation,
    setActiveConversationId,
  } = useConversation();

  return (
    <div className="bg-black min-w-72">
      <div className="flex flex-col gap-6 px-4 py-3">
        <div className="inline-flex gap-1 mx-1">
          <div className="size-3 rounded-full bg-primary" />
          <div className="size-3 rounded-full bg-primary" />
          <div className="size-3 rounded-full bg-primary" />
        </div>
        <Button onClick={createNewConversation}>
          <Plus className="mr-2" />
          Nova conversa
        </Button>
      </div>

      <div>
        <h4 className="px-4 pt-3 pb-2 uppercase text-muted-foreground text-xs font-bold">
          Conversas Recentes
        </h4>
        <ul className="list-none p-0">
          {conversations.map((conversation) => (
            <li
              key={conversation.chatId}
              className={clsx(
                "flex items-center gap-2 pl-6 py-2 hover:bg-accent text-muted-foreground cursor-pointer",
                { "bg-accent": conversation.chatId === activeConversationId }
              )}
              onClick={() => {
                setActiveConversationId(conversation.chatId);
                navigate(`/solution/chat/${conversation.chatId}`);
              }}
            >
              <MessageSquare size={16} />
              <div className="flex flex-col whitespace-nowrap pr-10 max-w-60">
                <p className="text-sm">{conversation.id}</p>
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {conversation.messages[-1]?.content ?? conversation.chatId}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
