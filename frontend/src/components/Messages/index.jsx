import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";
import Markdown from "react-markdown";

export const Messages = ({ messages }) => {
  return (
    <ul className="contents">
      {messages.map((message, index) => (
        <li key={index} className="list-none">
          <div className="flex gap-2">
            {message.role === "user" ? <LoggedInUserAvatar /> : <BotAvatar />}
            <Markdown className="max-w-[55ch] rounded-lg  pt-[.35rem]">
              {message.content}
            </Markdown>
          </div>
        </li>
      ))}
    </ul>
  );
};
