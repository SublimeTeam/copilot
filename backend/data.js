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
];

module.exports = {
  defaultChats,
};
