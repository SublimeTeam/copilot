import { Bot } from "lucide-react";
import { Avatar } from "../ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="size-8  align rounded-sm justify-center items-center bg-black">
      <Bot color="white" size={16} />
    </Avatar>
  );
};
