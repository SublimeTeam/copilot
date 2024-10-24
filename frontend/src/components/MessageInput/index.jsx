import { Send } from "lucide-react";
import { Button } from "../Button/index";
import { useState, useRef, useCallback } from "react";

export const MessageInput = ({ onSubmit, disabled }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (message.trim()) {
        onSubmit(message);
        setMessage("");
        if (inputRef.current) {
          inputRef.current.style.height = "100%";
        }
      }
    },
    [message, onSubmit]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleInput = useCallback((e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 144)}px`;
    e.target.style.overflowY =
      e.target.scrollHeight > 144 ? "scroll" : "hidden";
  }, []);

  return (
    <form
      disabled={disabled}
      onSubmit={handleSubmit}
      className="mb-10 pl-3 border rounded-md flex items-center overflow-hidden"
    >
      <label htmlFor="message" className="flex items-center w-full h-full">
        <textarea
          disabled={disabled}
          id="message"
          ref={inputRef}
          name="message"
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="O que você gostaria de perguntar?"
          className="py-3 indent-1 text-sm w-full border-none outline-none focus-visible:outline-none resize-none overflow-y-auto"
          rows="1"
          style={{ minHeight: "100%", maxHeight: "144px" }}
        />
      </label>
      <Button
        disabled={disabled}
        size="icon"
        type="submit"
        className="rounded-md m-1"
      >
        <Send size={18} />
      </Button>
    </form>
  );
};
