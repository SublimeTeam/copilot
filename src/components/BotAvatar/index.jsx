import { Bot } from "lucide-react";
import { Avatar } from "../ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="size-8 bg-foreground align rounded-sm justify-center items-center">
      <Bot className="text-background" />
    </Avatar>
  );
};
