describe('Fluxo de cadastro', () => {
  it('fluxo completo', () => {
    cy.visit('http://localhost:3000/login/register');
    cy.get("[data-test='cadastro:nome']").type('José');
    cy.get("[data-test='cadastro:email']").type('marcio_brust@gmail.com');
    cy.get("[data-test='cadastro:cpf']").type('16669650736');
    cy.get("[data-test='cadastro:cel']").type('21971852157');
    cy.get("[data-test='cadastro:password']").type('battlefield2');
    cy.get("[data-test='cadastro:passwordConfirm']").type('battlefield2');
    cy.get("[data-test='cadastro:termosDeUso']").click();
    cy.get("[data-test='cadastro:termosDeUsoConteudo']").scrollTo('bottom');
    cy.get("[data-test='cadastro:termosDeUsoConteudoCheckBox']").check();
    cy.get("[data-test='cadastro:signUpButton']").click();
  });
});
