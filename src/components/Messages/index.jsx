import { BotAvatar } from "../BotAvatar/index";
import { LoggedInUserAvatar } from "../LoggedInUserAvatar/index";

export const Messages = ({ messages }) => {
  return (
    <div className="flex flex-col gap-10 pt-5 pb-10">
      {messages.map((message, index) => (
        <div key={index} className="flex odd:flex-row-reverse gap-2">
          {!(index % 2) ? <LoggedInUserAvatar /> : <BotAvatar />}
          <p className="mt-1">{message}</p>
        </div>
      ))}
    </div>
  );
};
