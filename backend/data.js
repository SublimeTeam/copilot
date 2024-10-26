const defaultChats = [
  {
    chatId: "1729728629341",
    title: "Atribuição de perfil no Espaider",
    messages: [
      {
        role: "user",
        content: "Preciso fazer a atribuição de um perfil no sistema espaider",
      },
      {
        role: "assistant",
        content:
          'Para atribuir um perfil no sistema Espaider, siga estes passos:\n\n1.  **Acesse o sistema Espaider pelo seguinte endereço:** HTTPS://XXXXX\n2.  **Insira seu usuário e senha.** (Observação: Se você utilizar o navegador Internet Explorer, o acesso ao sistema será automático. Caso utilize outro navegador, será necessário inserir seu login e senha.)\n3.  **Clique em "Segurança" e "Usuários"** para visualizar os usuários cadastrados.\n4.  **Selecione a opção "Ativo" no campo "Filtros Rápidos".**\n5.  **Digite o nome do usuário no campo "Procurar" e pressione "Enter".** Selecione o usuário com um duplo clique.\n6.  **Clique na aba "Grupos" e na seta para adicionar o acesso para o usuário.**\n7.  **Verifique se os módulos selecionados estão em "Funções" e clique em "Salvar e Fechar".**\n\n**Observação:** Para usuários de pessoa física, utilize os Módulos "Requisições" e "Papel Requisitante". Caso seja usuário de pessoa jurídica, utilize o usuário cópia para identificação dos módulos. \n',
      },
      {
        role: "user",
        content:
          "Quais módulos devo utilizar para um usuário de pessoa física?",
      },
      {
        role: "assistant",
        content:
          'Para um usuário de pessoa física, utilize os módulos **"Requisições"** e **"Papel Requisitante"**. \n',
      },
      {
        role: "user",
        content: "o que é um módulo de papel requisitante?",
      },
      {
        role: "assistant",
        content:
          'O módulo **"Papel Requisitante"**  é utilizado para atribuir permissões a usuários que solicitam serviços ou recursos dentro do sistema.  Ele define quais ações o usuário pode realizar, como por exemplo,  criar  solicitações,  visualizar  status  de  solicitações  ou  aprovar  solicitações.  O módulo **"Papel Requisitante"**  é  específico  para  usuários de pessoa física e  garante  que  eles  tenham  acesso  apenas  às  funções  pertinentes  à  sua  função  dentro  do  sistema. \n',
      },
      {
        role: "user",
        content: "Qual o endereço do sistema Espaider?",
      },
      {
        role: "assistant",
        content:
          "Infelizmente, não tenho acesso a informações confidenciais, como endereços de sistemas.  \n*** \nVocê pode consultar o manual do sistema Espaider ou entrar em contato com o suporte técnico para obter essa informação. \n",
      },
      {
        role: "user",
        content: "Quais as permissões que o usuário precisa ter?",
      },
      {
        role: "assistant",
        content:
          "Para saber quais permissoes o usuario precisa ter, preciso de mais informacoes sobre a funcao do usuario no sistema Espaider.   \n   \n   \n   \n   Por exemplo,  \n   \n   \n   \n   *   **Qual  e  o  cargo  do  usuario?**  \n   \n   \n   \n   *   **Quais  tarefas  ele  precisa  realizar  no  sistema?**  \n   \n   \n   \n   *   **Ele  precisa  ter  acesso  a  informacoes  confidenciais?**  \n   \n   \n   \n   Com essas informacoes, posso te ajudar a definir as permissoes corretas para o usuario.  \n   \n   \n   \n   Lembre-se que  cada sistema possui  suas  proprias  permissoes  e  configuracoes  de  acesso.  \n   \n   \n   \n   Em caso de duvida, consulte o manual do sistema Espaider ou entre em contato com o suporte tecnico.\n",
      },
    ],
  },
  {
    chatId: "TASK0902990",
    title: "TASK0902990",
    messages: [
      {
        role: "assistant",
        content:
          'O usuário solicitou a troca de perfil no sistema Y. Para atender essa solicitação, siga os passos descritos na IT "ALTERAÇÃO DE PERFIL NO SISTEMA Y":\n\n1. **Colete as informações necessárias:**\n    * Nome Completo do colaborador;\n    * Usuário de acesso ao sistema;\n    * Ambiente que deseja alteração (QAS e PRD);\n    * Motivo da alteração de perfil;\n    * Grupo de acesso ou usuário cópia;\n    * Autorização do gerente imediato do colaborador.\n\n2. **Acesse o sistema via Internet Explorer utilizando o endereço ambiente de DESENVOLVIMENTO ou PRODUÇÃO.**\n3. **Faça logon utilizando o usuário e senha de ADMINISTRADOR.**\n4. **Clique em Configurações > Usuários.**\n5. **Clique sobre o usuário que deseja alterar o perfil.**\n6. **Informe o tipo de perfil desejado e clique em salvar.**\n\nLembre-se que a **revisão semestral de acessos** é realizada pelo Gestor do time de GQ-Digital. Caso a alteração seja parte dessa revisão, o processo será gerenciado pelo time de Digital - Acessos através de chamados no Sistema de ITSM de Digital. \n',
      },

      {
        role: "user",
        content: "Obrigado, consegui resolver o problema.",
      },
      {
        role: "assistant",
        content:
          "De nada! 😊 Fico feliz em ter ajudado. Se precisar de mais alguma coisa, pode me chamar.",
      },
      {
        role: "system",
        content:
          "Alterado o estado do chat para 'Fechado', com a seguinte resolução: Realizado conforme solicitado o espelhamento do perfil ",
      },
    ],
  },
];

// id
// abertura
// anexos
// data de abertura
// data de encerramento
// descrição
// tipo - Incidentes, Problemas, Requisições, Mudanças
// status - Aberto, Atribuido, Em Andamento, Em espera, Resolvido, Fechado
// logs

const tickets = [
  {
    id: "TASK0902990",
    opened_at: "21/02/2024 15:57",
    attachments: [],
    updated_at: "01/05/2024 18:00",
    closed_at: "01/05/2024 18:00",
    description: "Troca de Perfil",
    category: "Acessos",
    subcategory: "Alteração de Perfil",
    item: "Troca de Perfil",
    system: "SAP",
    group: "N1-OUTROS",
    service: "Service Desk",
    assignee: "Analista Service Desk",
    priority: "3 - Baixo",
    resolution_date: "01/05/2024 18:00",
    requester: "ADM Sistemas",
    location: "Centro de Distribuição",
    type: "Incidentes",
    status: "Fechado",
    logs: [],
  },

  {
    id: "TASK0946794",
    opened_at: "25/10/2024 14:44",
    attachments: [],
    updated_at: "25/10/2024 14:44",
    closed_at: "",
    description: "Não consigo logar em minha maquina",
    category: "Acessos",
    subcategory: "Reset/Desbloqueio de Senha",
    item: "Reset/Desbloqueio de Senha de Sistemas",
    system: "SAP PORTAL",
    group: "N1-ACESSOS",
    service: "Acesso",
    assignee: "Analista Acesso",
    priority: "1 - Alto",
    resolution_date: "",
    requester: "ADM Sistemas",
    location: "Escritório central",
    type: "Reset/Desbloqueio de Senha",
    status: "Em Andamento",
    logs: [
      "Aguardando atendimento",
      "Em atendimento",
      "Enviar evidencias",
      "Evidencias Anexadas",
      "Problema Persiste",
    ],
  },
  {
    id: "TASK0902920",
    opened_at: "21/02/2024 15:57",
    attachments: [],
    updated_at: "01/05/2024 18:00",
    closed_at: "01/05/2024 18:00",
    description: "Criar usuário de rede",
    category: "Acessos",
    subcategory: "Liberação de Acesso",
    item: "Criação de Acesso",
    system: "Com SAP",
    group: "N1-OUTROS",
    service: "Service Desk",
    assignee: "Analista Service Desk",
    priority: "3 - Baixo",
    resolution_date: "01/05/2024 18:00",
    requester: "ADM Sistemas",
    location: "Centro de Distribuição",
    type: "Incidentes",
    status: "Fechado",
    logs: [
      "Aguardando atendimento",
      "Em atendimento",
      "Enviar evidencias",
      "Evidencias Anexadas",
      "Problema Persiste",
      "Acionando Nivel 2",
      "Acionando Nvel 3",
      "Anexar aval e planilha de acesso",
      "Realizado envio das informações solicitadas",
      "Usuário de rede criado e enviado os dados ao gestor imediato",
    ],
  },
];

// Acessos	Liberação de Acesso	Criação de Acesso	Com SAP	N1-OUTROS	Service Desk	Analista Service Desk	3 - Baixo	01/05/2024 18:00:04	ADM Sistemas	Centro de Distribuição	Criar usuário de rede 	Aguardando atendimento 	Em atendimento	Enviar evidencias 	Evidencias Anexadas	Problema Persiste	Acionando Nivel 2 	Acionando Nvel 3 	Anexar aval e planilha de acesso 	Realizado envio das informações solicitadas	Usuário de rede criado e enviado os dados ao gestor imediato

module.exports = {
  defaultChats,
  tickets,
};
