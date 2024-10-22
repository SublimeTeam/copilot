import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const LoggedInUserAvatar = () => {
  return (
    <Avatar className="size-8">
      <AvatarImage draggable={false} src="https://github.com/85ED.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
