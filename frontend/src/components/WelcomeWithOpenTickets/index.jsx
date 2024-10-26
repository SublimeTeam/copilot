// import { tickets2 } from "@/pages/Solution/data";
import { Ticket } from "../Ticket/index";
import { useEffect, useState } from "react";

// const unresolvedTickets = Object.entries(tickets2).filter(
//   ([, ticket]) => ticket.resolvedAt === null
// );

// const sortedTickets = unresolvedTickets.sort(
//   ([, ticketA], [, ticketB]) => ticketB.sla - ticketA.sla
// );

export const WelcomeWithOpenTickets = ({ onSelectTicket }) => {
  // const navigate = useNavigate();

  // fetch tickets from backend using fetch api and set the state with the tickets
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  const topThreeTicketsObject = tickets.slice(0, 3);

  return (
    <>
      <h1 className="text-5xl text-muted-foreground pt-16 font-semibold">
        <span className="text-primary ">Olá, Edson</span>
        <br />
        <span className="text-4xl text-muted-foreground">
          Como posso ajudar você?
        </span>
      </h1>
      <div className="flex gap-3 min-w-fit">
        {topThreeTicketsObject.map((ticket) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            onClick={() => onSelectTicket(ticket.id)}
          />
        ))}
      </div>
    </>
  );
};
