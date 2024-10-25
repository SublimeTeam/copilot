import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axiosConfig"; // Import the configured axios instance
import { useParams, useNavigate } from "react-router-dom";

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export const ConversationProvider = ({ children }) => {
  // id da conversa ativa atavés da url
  const navigate = useNavigate();
  const { id = null } = useParams();
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/chats");
        setConversations(response?.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const createNewConversation = async () => {
    setActiveConversationId(null);
    navigate(`/chat`);
  };

  const addMessageToConversation = (
    conversationId,
    { role, content, suggestions = [] }
  ) => {
    if (!conversationId) {
      setConversations((prevConversations) => [
        ...prevConversations,
        { chatId: conversationId, messages: [{ role, content }], suggestions },
      ]);
      return;
    }

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.chatId === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, { role, content }],
              suggestions,
            }
          : conv
      )
    );
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    let chatId = activeConversationId;

    addMessageToConversation(chatId, { role: "user", content: message });
    setIsLoading(true);

    try {
      const response = await axios.post("/message", {
        chatId,
        message,
      });

      if (!chatId) {
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            !conv.chatId
              ? {
                  ...conv,
                  chatId: response.data.chatId,
                  title: response.data.title,
                  suggestions: response.data.suggestions,
                }
              : conv
          )
        );

        chatId = response.data.chatId;
        navigate(`/chat/${chatId}`);
        setActiveConversationId(chatId);
      }

      console.log("response.data", response.data);

      const aiResponse = { role: "assistant", content: response.data.response };
      addMessageToConversation(chatId, {
        ...aiResponse,
        suggestions: response.data.suggestions,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const togglePinConversation = (conversationId) => {
   setConversations((prevConversations) =>
     prevConversations.map((conv) =>
        conv.chatId === conversationId
         ? { ...conv, pinned: !conv.pinned }
         : conv
      )
    );
  };

  const value = {
    conversations,
    activeConversationId,
    isLoading,
    createNewConversation,
    sendMessage,
    setActiveConversationId,
    togglePinConversation
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
