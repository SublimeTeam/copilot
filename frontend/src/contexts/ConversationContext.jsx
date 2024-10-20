import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosConfig"; // Import the configured axios instance
import { useParams } from "react-router-dom";

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {
  // id da conversa ativa atavés da url
  const { id } = useParams();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch existing chats from the backend
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/chats");
        if (Array.isArray(response.data)) {
          setConversations(response.data);
        } else {
          console.error("Expected an array but got:", typeof response.data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const createNewConversation = async () => {
    try {
      const response = await axios.post("/chats");

      const newConversation = {
        chatId: response.data.chatId,
        messages: [],
        title: `Nova conversa ${conversations.length + 1}`,
      };

      setConversations([...conversations, newConversation]);
      setActiveConversationId(newConversation.chatId);
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };

  const addMessageToConversation = (conversationId, { role, content }) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.chatId === conversationId
          ? { ...conv, messages: [...conv.messages, { role, content }] }
          : conv
      )
    );
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !activeConversationId) return;

    const userMessage = { role: "user", content: message };
    addMessageToConversation(activeConversationId, userMessage);

    setIsLoading(true);

    try {
      const response = await axios.post("/message", {
        chatId: activeConversationId,
        message,
      });

      const aiResponse = { role: "assistant", content: response.data.response };

      console.log({ aiResponse });
      addMessageToConversation(activeConversationId, aiResponse);
    } catch (error) {
      console.error("Error sending message:", error);
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
