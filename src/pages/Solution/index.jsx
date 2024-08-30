import { ImagePlus, Mic } from "lucide-react";
import { tickets2 } from "./data";
import { Suggestions } from "@/components/Suggestions/index";
import { useParams } from "react-router-dom";
import { WelcomeWithOpenTickets } from "@/components/WelcomeWithOpenTickets/index";
import { Header } from "@/routes/private/Layout";
import { Separator } from "@/components/ui/separator";
import { Messages } from "@/components/Messages/index";

export const Solution = () => {
  const { id } = useParams();

  const isTicketResolved = id && !!tickets2[id]?.resolvedAt;
  const showSuggestionsAndInput = !id || !isTicketResolved;

  return (
    <div className="flex w-full justify-center bg-background flex-col max-h-screen">
      <div className="overflow-auto mx-auto w-full flex-1 flex-col">
        <Header />
        <div className="w-[75ch] mx-auto">
          {!id || !tickets2[id] ? (
            <WelcomeWithOpenTickets />
          ) : (
            <>
              <Messages messages={tickets2[id].messages} />
              {isTicketResolved && (
                <>
                  <Separator className="mb-2" />
                  <div className="mb-10 flex justify-center text-sm">
                    {`Ticket marcado como ${tickets2[id].reportStatus} em ${tickets2[id].resolvedAt}`}
                    <br />
                    {tickets2[id].resolution}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {showSuggestionsAndInput && (
        <div className="h-32 bottom-0 bg-primary-foreground">
          <div className="mx-auto w-[75ch]">
            <Suggestions ticketId={!!id && !!tickets2[id] ? id : null} />

            <label
              htmlFor="question"
              className="px-3 border rounded-full flex items-center overflow-hidden"
            >
              <input
                id="question"
                placeholder="What you would like to ask?"
                className="py-3 indent-1 text-sm w-full border-none outline-none focus-visible:outline-none"
              />
              <div className="inline-flex gap-2 pr-1">
                <button className="text-muted-foreground hover:text-foreground">
                  <ImagePlus size={18} />
                </button>
                <button className="text-muted-foreground hover:text-foreground">
                  <Mic size={18} />
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
