
beforeEach(() => {
    cy.visit("https://devfinance-agilizei.netlify.app/#");
})

describe('Transações', () => {
    it('Cadastrar uma entrada', () => {
      
        
        criaTransacao("Lanche", 250);

        cy.get("tbody tr td.description").should("have.text", "Lanche");
    });

    it('Cadastrar uma saída', () => {
   
        criaTransacao("LancheHoje", -40);
    });

    it('Excluir Transação', () => {
        criaTransacao("LancheHoje", -40);
    
        // Localiza a transação pelo texto da descrição
        cy.contains(".description", "LancheHoje")
            .parent() // Seleciona o elemento pai (a linha da tabela)
            .find('img') // Procura pela imagem do botão de exclusão dentro do pai
            .click(); // Clica no botão de exclusão
    
        // Valida que a transação foi excluída
        cy.contains(".description", "LancheHoje").should('not.exist');
    });
    
    function criaTransacao(descricao, valor) {
        cy.contains("Nova Transação").click();
        cy.get('#description').type(descricao);
        cy.get('#amount').type(valor);
        cy.get('#date').type('2024-11-15');

        cy.contains('button', 'Salvar').click();
    }
});
