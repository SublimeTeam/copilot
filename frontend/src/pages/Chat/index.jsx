import { MessageInput } from "@/components/MessageInput/index";
import { Messages } from "@/components/Messages/index";
import { Suggestions } from "@/components/Suggestions/index";
import { WelcomeWithOpenTickets } from "@/components/WelcomeWithOpenTickets/index";
import { useConversation } from "@/contexts/ConversationContext";
import "@/pages/Chat/animation.css";

export const Chat = () => {
  const { conversations, activeConversationId, isLoading, sendMessage } =
    useConversation();

  const handleSendMessage = async (message) => {
    await sendMessage(message);
  };

  const activeConversation = conversations.find(
    (conv) => conv?.chatId == activeConversationId
  );

  return (
    <>
      <div className="overflow-auto flex-1 ">
        <div className="mx-auto flex flex-col w-[660px] gap-8">
          {activeConversation ? (
            <Messages messages={activeConversation?.messages} />
          ) : (
            <WelcomeWithOpenTickets />
          )}
        </div>
      </div>

      <div
        style={{
          boxShadow: "rgb(255 255 255) 0px -20px 70px 4px",
        }}
        className="mx-auto w-[75ch] z-10 "
      >
        <div className="pt-5">
          {isLoading && (
            <p className="loading">
              Copilot está digitando
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </p>
          )}
        </div>
        {activeConversation?.suggestions && (
          <Suggestions
            suggestions={activeConversation.suggestions}
            onSuggestionClick={handleSendMessage}
          />
        )}
        <div className="text-center mb-1">
          <MessageInput onSubmit={handleSendMessage} />
          <div className="text-xs text-muted-foreground mb-2 indent-2 pl-2">
            O Copilot pode apresentar erros. Certifique-se de revisar
            informações críticas com atenção.
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="flex w-full justify-center bg-background flex-col max-h-screen">
<div className="overflow-auto mx-auto w-full flex-1 flex-col">
  <Header />
  <div className="w-[75ch] mx-auto">
    {!id || !tickets2[id] ? (
      <WelcomeWithOpenTickets />
    ) : (
      <>
        <Messages messages={tickets2[id].messages} />
        {isTicketResolved && (
          <>
            <Separator className="mb-2" />
            <div className="mb-10 flex justify-center text-sm">
              {`Ticket marcado como ${tickets2[id].reportStatus} em ${tickets2[id].resolvedAt}`}
              <br />
              {tickets2[id].resolution}
            </div>
          </>
        )}
      </>
    )}
  </div>
</div>

{showSuggestionsAndInput && (
  <div className="h-32 bottom-0 bg-primary-foreground">
    <div className="mx-auto w-[75ch]">
      <Suggestions ticketId={!!id && !!tickets2[id] ? id : null} />

      <label
        htmlFor="question"
        className="px-3 border rounded-full flex items-center overflow-hidden"
      >
        <input
          id="question"
          placeholder="O que você gostaria de perguntar?"
          className="py-3 indent-1 text-sm w-full border-none outline-none focus-visible:outline-none"
        />
        <div className="inline-flex gap-2 pr-1">
          <button className="text-muted-foreground hover:text-foreground">
            <ImagePlus size={18} />
          </button>
          <button className="text-muted-foreground hover:text-foreground">
            <Mic size={18} />
          </button>
        </div>
      </label>
    </div>
  </div>
)}
</div>  */
}
