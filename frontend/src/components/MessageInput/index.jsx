import { ImagePlus, Mic } from "lucide-react";
import { useRef } from "react";

export const MessageInput = ({ onSubmit }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    e.target.reset();
    onSubmit(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-32 bottom-0 bg-primary-foreground">
        <div className="mx-auto w-[75ch]">
          <label
            htmlFor="message"
            className="px-3 border rounded-full flex items-center overflow-hidden"
          >
            <input
              id="message"
              ref={inputRef}
              name="message"
              autoComplete="off"
              placeholder="O que você gostaria de perguntar?"
              className="py-3 indent-1 text-sm w-full border-none outline-none focus-visible:outline-none"
            />
            <div className="inline-flex gap-2 pr-1">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
              >
                <ImagePlus size={18} />
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mic size={18} />
              </button>
            </div>
            {inputRef.current?.value && <button type="submit">Enviar</button>}
          </label>
        </div>
      </div>
    </form>
  );
};
