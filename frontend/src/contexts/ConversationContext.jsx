import { createContext, useContext, useState, useEffect } from "react";
import { isAIConfigured, model } from "@/config/ai";

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

const persistConversations = (conversations) => {
  localStorage.setItem("conversations", JSON.stringify(conversations));
};

const loadConversations = () => {
  const conversations = localStorage.getItem("conversations");
  return conversations ? JSON.parse(conversations) : [];
};

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const persistedConversations = loadConversations();
    setConversations(persistedConversations);
  }, []);

  useEffect(() => {
    if (conversations.length > 0) {
      persistConversations(conversations);
    }
  }, [conversations]);

  const createNewConversation = async () => {
    const newChat = await model.startChat({
      generationConfig: {
        maxOutputTokens: 100,
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

  const addMessageToConversation = (conversationId, { role, content }) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, { role, content }] }
          : conv
      )
    );
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !activeConversationId) return;

    console.log("conversations", { conversations });

    const userMessage = { role: "user", content: message };
    addMessageToConversation(activeConversationId, userMessage);

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

      addMessageToConversation(activeConversationId, aiResponse);
    } catch (error) {
      console.error("Error generating AI response:", error);

      const aiMessage = {
        role: "ai",
        content:
          "Sorry, I encountered an error. Please make sure the AI is properly configured and try again.",
      };

      addMessageToConversation(activeConversationId, aiMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    conversations,
    activeConversationId,
    isLoading,
    createNewConversation,
    sendMessage,
    setActiveConversationId,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
