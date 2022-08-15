/// <reference types="cypress" />
const user = {
  name: "felipe37",
  password: "1234"
};
describe("Enter Menu", () => {
    
  
    it("should signup and sign in", () => {
      
  
      cy.visit("http://localhost:3000")
      cy.contains("Criar conta").click()
      cy.get('input[placeholder="nome..."]').type(user.name)
      cy.get('input[placeholder="senha..."]').type(user.password)
  
      cy.intercept("POST", "/signup").as("signup")
      cy.contains("Cadastrar").click()
      cy.wait("@signup");
      
      cy.get('input[placeholder="nome..."]').type(user.name)
      cy.get('input[placeholder="senha..."]').type(user.password)

      cy.intercept("POST", "/signin").as("signin");
      cy.contains("Entrar").click()
      cy.wait("@signin");

      cy.url().should("equal", "http://localhost:3000/menu");
      ;
    })
  
  })