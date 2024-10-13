import { isAIConfigured, model } from "@/config/ai";
import { useEffect, useState } from "react";

export const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Inicializa a primeira conversa ao carregar o componente
    createNewConversation();
  }, []);

  const createNewConversation = async () => {
    const newChat = await model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const newConversation = {
      id: Date.now(),
      chat: newChat,
      messages: [],
      title: `Nova conversa ${conversations.length + 1}`,
    };

    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversation.id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;

    if (!message.trim() || !activeConversationId) return;

    e.target.reset();

    const userMessage = { role: "user", content: message };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, userMessage] }
          : conv
      )
    );

    setIsLoading(true);

    try {
      if (!isAIConfigured) {
        throw new Error(
          "AI is not configured. Please set the VITE_GOOGLE_AI_API_KEY environment variable."
        );
      }

      const activeConversation = conversations.find(
        (conv) => conv.id === activeConversationId
      );
      const result = await activeConversation.chat.sendMessage(message);
      const response = await result.response;
      const aiResponse = { role: "ai", content: response.text() };

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiResponse] }
            : conv
        )
      );
    } catch (error) {
      console.error("Error generating AI response:", error);

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  {
                    role: "ai",
                    content:
                      "Sorry, I encountered an error. Please make sure the AI is properly configured and try again.",
                  },
                ],
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  return (
    <div>
      <button onClick={createNewConversation}>Nova Conversa</button>

      <div>
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveConversationId(conv.id)}
            style={{
              fontWeight: conv.id === activeConversationId ? "bold" : "normal",
            }}
          >
            {conv.title}
          </button>
        ))}
      </div>

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

// export const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [chat, setChat] = useState(null);

//   useEffect(() => {
//     const initializeChat = async () => {
//       const newChat = await model.startChat({
//         generationConfig: {
//           maxOutputTokens: 1000,
//         },
//       });
//       setChat(newChat);
//     };

//     initializeChat();
//   }, []);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     const message = e.target.elements.message.value;

//     if (!message.trim() || !chat) return;

//     e.target.reset();

//     const userMessage = { role: "user", content: message };
//     setMessages([...messages, userMessage]);
//     setIsLoading(true);

//     try {
//       if (!isAIConfigured) {
//         throw new Error(
//           "AI is not configured. Please set the VITE_GOOGLE_AI_API_KEY environment variable."
//         );
//       }

//       const result = await chat.sendMessage(message);
//       const response = await result.response;
//       const aiResponse = { role: "ai", content: response.text() };
//       setMessages((prevMessages) => [...prevMessages, aiResponse]);
//     } catch (error) {
//       console.error("Error generating AI response:", error);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           role: "ai",
//           content:
//             "Sorry, I encountered an error. Please make sure the AI is properly configured and try again.",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {isLoading && <p>Carregando...</p>}
//       <ul>
//         {messages.map((message, index) => (
//           <li key={index}>{message.content}</li>
//         ))}
//       </ul>

//       <div>
//         <form onSubmit={handleSendMessage}>
//           <input type="text" name="message" placeholder="digite sua mensagem" />
//           <button type="submit">Enviar</button>
//         </form>
//       </div>
//     </div>
//   );
// };
