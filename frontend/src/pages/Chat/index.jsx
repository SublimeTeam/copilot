import { WelcomeWithOpenTickets } from "@/components/WelcomeWithOpenTickets/index";
import { useConversation } from "@/contexts/ConversationContext";
import Markdown from "react-markdown";

export const Chat = () => {
  const { conversations, activeConversationId, isLoading, sendMessage } =
    useConversation();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    e.target.reset();
    await sendMessage(message);
  };

  const activeConversation = conversations.find(
    (conv) => conv.chatId == activeConversationId
  );

  const conversationHasMessages = activeConversation?.messages.length > 0;

  return (
    <div>
      <h2>{activeConversation.chatId}</h2>
      {conversationHasMessages ? (
        <div>
          <ul>
            {activeConversation.messages.map((message, index) => (
              <Markdown key={index}>{message.content}</Markdown>
            ))}
          </ul>

          {isLoading && <p>Carregando...</p>}
        </div>
      ) : (
        <WelcomeWithOpenTickets />
      )}
      <div>
        <form onSubmit={handleSendMessage}>
          <input type="text" name="message" placeholder="digite sua mensagem" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
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
