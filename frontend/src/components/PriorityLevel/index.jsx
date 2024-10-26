import { Tally2, Tally3, Tally4 } from "lucide-react";
import { Chip } from "../Chip/index";

export const PriorityLevel = ({ priority = "3 - Baixa" }) => {
  const splitPriority = priority.split(" - ");

  const Icon = [Tally4, Tally3, Tally2][splitPriority[0] - 1];

  return (
    <Chip>
      <Icon size={16} />
      {splitPriority[1]}
    </Chip>
  );
};
