import { Plus, MessageSquare } from "lucide-react";
import { Button } from "../Button/index";
import { useNavigate } from "react-router-dom";
import { tickets2 } from "@/pages/Solution/data";
import clsx from "clsx";
import { useParams } from "react-router-dom";

export const SideBar = () => {
  const { id: idFromParams } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-black min-w-72">
      <div className="flex flex-col gap-6 px-4 py-3">
        <div className="inline-flex gap-1 mx-1">
          <div className="size-3 rounded-full bg-primary" />
          <div className="size-3 rounded-full bg-primary" />
          <div className="size-3 rounded-full bg-primary" />
        </div>
        <Button onClick={() => navigate("/solution/new")}>
          <Plus className="mr-2" />
          New chat
        </Button>
      </div>

      <div>
        <h4 className="px-4 pt-3 pb-2 uppercase text-muted-foreground text-xs font-bold">
        Recentes
        </h4>
        <ul className="list-none p-0">
          {Object.entries(tickets2).map(([id, value]) => (
            <li
              key={id}
              className={clsx(
                "flex items-center gap-2 pl-6 py-2 hover:bg-accent text-muted-foreground cursor-pointer",
                { "bg-accent": id === idFromParams }
              )}
              onClick={() => navigate(`/solution/${id}`)}
            >
              <MessageSquare size={16} />
              <div className="flex flex-col whitespace-nowrap pr-10 max-w-60">
                <p className="text-sm">{id}</p>
                <div className="text-sm font-medium text-ellipsis overflow-hidden">
                  {value.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
