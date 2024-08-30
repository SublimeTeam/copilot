import { MockAnswer1 } from "@/components/Answers/index";
import { Ticket } from "@/components/Ticket/index";

export const tickets2 = {
  TASK0948367: {
    id: "TASK0948367",
    sla: 2,
    priority: 3,
    openedAt: "09/02/2024 17:15:47",
    updatedAt: "03/05/2024 14:34:26",
    reportStatus: "Em atendimento",
    resolvedAt: null,
    reportCategory: "Outros Sistemas",
    reportSubcategory: "Adapt",
    symptom: "Lentidão sistema",
    symptomQualification: "",
    assignmentGroup: "N2-LEG-SAT",
    category: "AMS-Não SAP",
    assignedTo: "Analista AMS",
    closedAt: "01/05/2024 18:00:04",
    taskRequester: "ADM Sistemas",
    location: "Fábrica 1",
    description: "Lentidão sistema",
    resolution: "Solução aplicada: Reiniciado serviço database",
    suggestions: [
      "Gerar documentação em pdf",
      "Como realizar uma alteração de Acessos?",
      "Como criar novos Acessos?",
    ],
    messages: [
      <Ticket ticketId="TASK0948367" key={0} />,
      <MockAnswer1 key={1} />,
    ],
  },
  TASK0948362: {
    id: "TASK0948362",
    sla: 0,
    priority: 3,
    openedAt: "09/02/2024 17:15:47",
    updatedAt: "03/05/2024 14:34:26",
    reportStatus: "Em atendimento",
    resolvedAt: "03/05/2024 14:34:26",
    reportCategory: "Outros Sistemas",
    reportSubcategory: "Adapt",
    symptom: "Lentidão sistema",
    symptomQualification: "",
    assignmentGroup: "N2-LEG-SAT",
    category: "AMS-Não SAP",
    assignedTo: "Analista AMS",
    closedAt: "01/05/2024 18:00:04",
    taskRequester: "ADM Sistemas",
    location: "Fábrica 1",
    description: "Lentidão sistema",
    resolution: "Solução aplicada: Reiniciado serviço database",
    suggestions: [
      "Como realizar uma alteração de Acessos?",
      "Como criar novos Acessos?",
    ],
    messages: ["Olá", "Eae, tudo bom?"],
  },
  TASK0948364: {
    id: "TASK0948364",
    sla: 2,
    priority: 3,
    openedAt: "09/02/2024 17:15:47",
    updatedAt: "03/05/2024 14:34:26",
    reportStatus: "Resolvido",
    resolvedAt: "03/05/2024 14:34:26",
    reportCategory: "Outros Sistemas",
    reportSubcategory: "Adapt",
    symptom: "Lentidão sistema",
    symptomQualification: "",
    assignmentGroup: "N2-LEG-SAT",
    category: "AMS-Não SAP",
    assignedTo: "Analista AMS",
    closedAt: "01/05/2024 18:00:04",
    taskRequester: "ADM Sistemas",
    location: "Fábrica 1",
    description: "Lentidão sistema",
    resolution: "Solução aplicada: Reiniciado serviço database",
    messages: [
      <Ticket ticketId="TASK0948364" key={0} />,
      <MockAnswer1 key={1} />,
      "Obrigado, estou conseguindo aplicar os passos",
      "Não há de que! Estou aqui para ajudar :)",
    ],
  },
};