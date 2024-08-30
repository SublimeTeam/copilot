export const MockAnswer1 = () => {
  return (
    <p>
      Ok! Recebi as informações sobre o Ticket, e para resolver a solicitação do
      usuário <strong>ADM Sistemas</strong> de acordo com a Instrução de
      Trabalho (IT) fornecida, você deve seguir os seguintes passos:
      <br />
      <ol>
        <li>
          <strong>Verificar os pré-requisitos:</strong>
          <ul>
            <li>
              <strong>Nome do colaborador:</strong> José de Carmo.
            </li>
            <li>
              <strong>Usuário do Sistema SISTEMA Y:</strong> Confirmado pelo
              ticket.
            </li>
            <li>
              <strong>Motivo da alteração do perfil:</strong> "O usuário deixou
              a empresa."
            </li>
            <li>
              <strong>Tipo e Grupo de acesso:</strong> Grupo exemplo.
            </li>
            <li>
              <strong>Autorização gerencial:</strong> Certifique-se de que há
              uma autorização gerencial em anexo ao chamado.
            </li>
          </ul>
        </li>
        <li>
          <strong>Acessar o SISTEMA Y:</strong>
          <ul>
            <li>
              Clique em "Users" para exibir todos os usuários cadastrados no
              sistema.
            </li>
          </ul>
        </li>
        <li>
          <strong>Identificar o status do usuário:</strong>
          <ul>
            <li>
              Verifique se o usuário José de Carmo está no grupo de "Ativos",
              "Inativos" ou "Removidos":
            </li>
            <ul>
              <li>
                <strong>Ativos:</strong> Se estiver ativo, o usuário ainda tem
                acesso ao sistema.
              </li>
              <li>
                <strong>Inativos:</strong> O usuário não poderá acessar o
                sistema.
              </li>
              <li>
                <strong>Removidos:</strong> O usuário foi removido do sistema e
                não poderá acessá-lo.
              </li>
            </ul>
          </ul>
        </li>
        <li>
          <strong>Remover ou desativar o usuário:</strong>
          <ul>
            <li>
              Dado que o motivo da solicitação é "O usuário deixou a empresa", o
              atendente deve alterar o status do usuário para "Removido",
              conforme as diretrizes da IT para colaboradores desligados.
            </li>
          </ul>
        </li>
        <li>
          <strong>Registrar a alteração:</strong>
          <ul>
            <li>
              Documente a alteração no Sistema de ITSM de Digital, conforme os
              procedimentos padrão, incluindo evidências, se necessário.
            </li>
          </ul>
        </li>
        <li>
          <strong>Finalizar o chamado:</strong>
          <ul>
            <li>
              Feche o chamado com o status "Resolvido", confirmando que a
              alteração foi realizada conforme solicitado.
            </li>
          </ul>
        </li>
      </ol>
      <p>
        Esses passos garantem que o processo seja seguido corretamente, de
        acordo com as instruções fornecidas.
      </p>
    </p>
  );
};
