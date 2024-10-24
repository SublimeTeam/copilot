import React, { useEffect, useRef } from "react";
import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";
import Markdown from "react-markdown";

export const Messages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                <div className="max-w-[55ch] rounded-lg text-left">
                  <Markdown className="w-[65ch] rounded-lg pt-[.35rem]">
                    {message.content}
                  </Markdown>
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