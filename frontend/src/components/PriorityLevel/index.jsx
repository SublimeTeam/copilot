import { Tally4 } from "lucide-react";
import { Chip } from "../Chip/index";

export const PriorityLevel = () => {
  return (
    <Chip>
      <Tally4 size={16} />
      Alta Prioridade
    </Chip>
  );
};
