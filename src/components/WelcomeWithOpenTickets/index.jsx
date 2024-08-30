import { useNavigate } from "react-router-dom";
import { tickets2 } from "@/pages/Solution/data";
import { Ticket } from "../Ticket/index";

const unresolvedTickets = Object.entries(tickets2).filter(
  ([, ticket]) => ticket.resolvedAt === null
);

const sortedTickets = unresolvedTickets.sort(
  ([, ticketA], [, ticketB]) => ticketB.sla - ticketA.sla
);

const topThreeTicketsObject = Object.fromEntries(sortedTickets.slice(0, 3));

export const WelcomeWithOpenTickets = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-5xl text-muted-foreground pt-16 font-semibold mb-14">
        <span className="text-primary ">Hello, Leandro</span>
        <br />
        <span className="text-4xl text-muted-foreground">
          which ticket can I help you with?
        </span>
      </h1>
      <div className="flex gap-3 min-w-fit">
        {Object.entries(topThreeTicketsObject).map(([id, ticket]) => (
          <Ticket
            key={id}
            ticket={ticket}
            onClick={() => navigate(`/solution/${id}`)}
          />
        ))}
      </div>
    </>
  );
};
