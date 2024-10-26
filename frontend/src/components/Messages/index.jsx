import { useEffect, useRef, useState } from "react";
import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";
import Markdown from "react-markdown";
import { Alert } from "../ui/alert";
import { Copy } from "lucide-react";
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
          {message.role === "system" ? (
            <div className="flex justify-center mb-4">
              <Alert className="text-sm text-gray-500">{message.content}</Alert>
            </div>
          ) : (
            <div
              className={`flex gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "user" ? (
                <>
                  <div className="max-w-[55ch] rounded-lg text-right">
                    <Markdown
                      className="pt-[.35rem]"
                      components={{
                        code: (props) => <span {...props} />,
                        pre: (props) => <span {...props} />,
                      }}
                    >
                      {message.content}
                    </Markdown>
                  </div>
                  <LoggedInUserAvatar />
                </>
              ) : (
                <>
                  <BotAvatar />
                  <div className="max-w-[55ch] rounded-lg text-left">
                    <Markdown
                      className="w-[55ch] rounded-lg pt-[.35rem]"
                      components={{
                        code: (props) => <span {...props} />,
                        pre: (props) => <span {...props} />,
                      }}
                    >
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
                        <Copy size={16} className="text-gray-500" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </li>
      ))}
      <div ref={messagesEndRef} />
    </ul>
  );
};
