import { useConversation } from "@/contexts/ConversationContext";

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
    (conv) => conv.id == activeConversationId
  );

  console.log({ conversations, activeConversationId, activeConversation });

  return (
    <div>
      {activeConversation && (
        <div>
          <h2>{activeConversation.title}</h2>
          {isLoading && <p>Carregando...</p>}
          <ul>
            {activeConversation.messages.map((message, index) => (
              <li key={index}>{message.content}</li>
            ))}
          </ul>

          <div>
            <form onSubmit={handleSendMessage}>
              <input
                type="text"
                name="message"
                placeholder="digite sua mensagem"
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
