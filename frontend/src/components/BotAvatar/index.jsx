import { Bot } from "lucide-react";
import { Avatar } from "../ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="size-8  align rounded-[10px] justify-center items-center">
      <Bot className="text-indigo-600" />
    </Avatar>
  );
};
