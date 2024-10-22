import { Chip } from "../Chip/index";

export const Suggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <>
      <div className="text-xs text-muted-foreground mb-2 indent-2 pl-2">
        Sugestões baseadas no histórico
        <div className="flex gap-2">
          {suggestions.map((suggestion) => (
            <div className="flex gap-2" key={suggestion}>
              <button onClick={() => onSuggestionClick(suggestion)}>
                <Chip>{suggestion}</Chip>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
