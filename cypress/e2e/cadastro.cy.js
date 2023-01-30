/* import { faker } from '@faker-br/faker'; */
const faker = require('faker-br');

const randomName = faker.internet.userName();
const randomEmail = faker.internet.email();
const randomCpf = faker.br.cpf();
const randomPhone = faker.phone.phoneNumber();
const randomPassword = faker.internet.password();

describe('Fluxo de cadastro', () => {
  it('fluxo completo', () => {
    cy.visit('http://localhost:3000/login/register');
    cy.get("[data-test='cadastro:nome']").type(randomName);
    cy.get("[data-test='cadastro:email']").type(randomEmail);
    cy.get("[data-test='cadastro:cpf']").type(randomCpf);
    cy.get("[data-test='cadastro:cel']").type(randomPhone);
    cy.get("[data-test='cadastro:password']").type(randomPassword);
    cy.get("[data-test='cadastro:passwordConfirm']").type(randomPassword);
    cy.get("[data-test='cadastro:termosDeUso']").click();
    cy.get("[data-test='cadastro:termosDeUsoConteudo']").scrollTo('bottom');
    cy.get("[data-test='cadastro:termosDeUsoConteudoCheckBox']").check();
    cy.get("[data-test='cadastro:signUpButton']").click();
    cy.contains(
      "[data-test='cadastro:text']",
      'Para prosseguir para os próximos steps, você precisa concluir o cadastro da sua barbearia, e registar as informações iniciais do primeiro step.'
    );
  });
});
