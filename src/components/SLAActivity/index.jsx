import { Activity } from "lucide-react";
import { clsx } from "clsx";

export const SLAActivity = ({ level = 0 }) => {
  const colors = [
    { container: "bg-green-400", text: "text-green-500" },
    { container: "bg-amber-400", text: "text-amber-500" },
    { container: "bg-red-400", text: "text-red-500" },
  ];

  const text = ["On track", "At risk", "Off track"];

  return (
    <div className={clsx("flex items-center gap-1", colors[level].text)}>
      <Activity
        size={16}
        className={clsx(
          "p-[2px] rounded-full bg-opacity-40",
          colors[level].container
        )}
      />
      <p className="text-xs font-semibold tracking-normal">{text[level]}</p>
    </div>
  );
};
