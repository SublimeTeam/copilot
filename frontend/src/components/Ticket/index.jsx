import { tickets2 } from "@/pages/Solution/data";
import { PriorityLevel } from "../PriorityLevel/index";
import { SLAActivity } from "../SLAActivity/index";
import { formatDate } from "@/utils/formatTime";

export const Ticket = ({
  ticketId,
  ticket = tickets2[ticketId],
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      key={ticket.id}
      className="inline-block min-w-56 max-w-56 p-3 border border-black border-opacity-10 rounded-lg text-sm min-h-44 has-[not:hover]:first:dark bg-background text-left hover:dark"
    >
      <div className="flex flex-col content-between h-full justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <SLAActivity level={ticket.sla} />
            <time dateTime={ticket.openedAt} className="text-foreground">
              {formatDate(ticket.openedAt)}
            </time>
          </div>
          <div className="leading-4">
            <p className="text-muted-foreground text-xs leading-3 m-0">
              {ticket.id}
            </p>
            <p className="text-foreground pt-1 leading-[1.15rem]">
              {ticket.description}
            </p>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">{ticket.reportStatus}</p>
          <PriorityLevel />
        </div>
      </div>
    </button>
  );
};
