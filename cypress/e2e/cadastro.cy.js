/* import { faker } from '@faker-br/faker'; */
const faker = require('faker-br');

const randomName = faker.internet.userName();
const randomEmail = faker.internet.email();
const randomCpf = faker.br.cpf();
const randomPhone = faker.phone.phoneNumber();
const randomPassword = faker.internet.password();
const randomCampanyName = faker.name.jobTitle();
const randomCep = faker.address.zipCode();
const randomBairro = faker.address.state();
const randomEndereco = faker.lorem.text();
const randomNumero = faker.random.number();

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

  it('add', () => {
    cy.get("data-test='dados:nomeBarbearia']").type(randomCampanyName);
    cy.get("data-test='dados:celBarbearia']").type(randomPhone);
    cy.get("data-test='dados:checkBox']").click();
    cy.get("data-test='dados:telBarbearia']").type(randomPhone);
    cy.get("[data-test='dados:email']").type(randomEmail);
    cy.get("[data-test='dados:cep']").type(randomCep);
    cy.get("[data-test='dados:bairro']").type(randomBairro);
    cy.get("[data-test='dados:endereco']").type(randomEndereco);
    cy.get("[data-test='dados:complemento']").type(randomEndereco);
    cy.get("[data-test='dados:numero']").type(randomNumero);
    cy.get("[data-test='dados:button']").click();
  });
});
