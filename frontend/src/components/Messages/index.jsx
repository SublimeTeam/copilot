import React, { useEffect, useRef, useState } from "react";
import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";
import Markdown from "react-markdown";

export const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 1000); 
  };

  return (
    <ul className="contents">
      {messages.map((message, index) => (
        <li key={index} className="list-none mb-4 last:mb-10">
          <div className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "user" ? (
              <>
                <div className="max-w-[55ch] rounded-lg text-right">
                  <Markdown>{message.content}</Markdown>
                </div>
                <LoggedInUserAvatar />
              </>
            ) : (
              <>
                <BotAvatar />
                <div className="max-w-[55ch] rounded-lg text-left relative flex items-center">
                  <Markdown className="w-[65ch] rounded-lg pt-[.35rem]">
                    {message.content}
                  </Markdown>
                  <button
                    onClick={() => handleCopy(message.content, index)}
                    className="ml-2 bg-transparent text-sm text-blue-500 transition-transform transform hover:scale-110"
                    aria-label="Copiar"
                    style={{ transition: "transform 0.2s ease-in-out" }}
                  >
                    {copiedIndex === index ? (
                      <span className="text-gray-500 text-xs">Copiado</span>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-gray-800"
                      >
                        <path d="M13 9h8v13H3V2h10v7zm-3 3v5h2v-4h4v-2H10zm7-6.414L12.414 5H10v3h7V5.586zM8 0H0v16h2V2h6V0z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </li>
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};
