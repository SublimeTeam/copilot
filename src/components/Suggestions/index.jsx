import { tickets2 } from "@/pages/Solution/data";
import { Chip } from "../Chip/index";

const suggestions = [
  "Como realizar uma alteração de Acessos?",
  "Como criar novos Acessos?",
  "Instruções de trabalho",
];

export const Suggestions = ({ ticketId }) => {
  const data = ticketId
    ? {
        text: "Suggestions based on this ticket",
        suggestions: tickets2[ticketId].suggestions,
      }
    : { text: "Sugestões baseadas em tickets abertos", suggestions };

  return (
    data.suggestions && (
      <div className="text-xs text-muted-foreground mb-2 indent-2 pl-2">
        {data.text}
        <div className="flex gap-2">
          {data.suggestions.map((suggestion, index) => (
            <button key={index}>
              <Chip>{suggestion}</Chip>
            </button>
          ))}
        </div>
      </div>
    )
  );
};
