import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";
import Markdown from "react-markdown";

export const Messages = ({ messages }) => {
  return (
    <ul className="contents">
      {messages.map((message, index) => (
        <li key={index} className="list-none last:mb-10">
          <div className="flex gap-4">
            {message.role === "user" ? <LoggedInUserAvatar /> : <BotAvatar />}
            <Markdown className="w-[65ch] rounded-lg  pt-[.35rem]">
              {message.content}
            </Markdown>
          </div>
        </li>
      ))}
    </ul>
  );
};
