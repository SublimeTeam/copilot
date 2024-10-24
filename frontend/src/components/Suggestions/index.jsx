import { Chip } from "../Chip/index";

export const Suggestions = ({ suggestions, onSuggestionClick }) => {
  if (!suggestions || suggestions.length === 0) return null;

  // remove duplicates, if theres only one suggestion, remove it. if the text in the suggestion is composed by only one word, remove it.
  const uniqueSuggestions = suggestions.filter(
    (suggestion, index, self) =>
      self.findIndex((t) => t.toLowerCase() === suggestion.toLowerCase()) ===
      index
  );

  return (
    <>
      <div className="text-xs text-muted-foreground mb-2 indent-2 pl-2">
        Sugestões baseadas no histórico
        <div className="flex gap-[2px] flex-wrap">
          {uniqueSuggestions.map((suggestion) => (
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
