/// <reference types = "Cypress"/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { GreenKartObj } from "../../pageObjects/GreenKartObj";

var ProductName, ProductPrice;
let Thanks = "Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!"
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  
}

Given("User should be on product listing page", () => {
  
  cy.get(GreenKartObj.SiteName).should("contain.text", "GREENKART");
  cy.get(GreenKartObj.Products).should("be.visible");
});
When("User places order of product", () => {
  let num = getRandomInt(1, 30);
    cy.get(":nth-child(" + num + ") > .product-action > button").click();
    cy.get(":nth-child(" + num + ") > .product-name").then(($ProdName) => {
      ProductName = $ProdName.text();
      console.log(ProductName);
      cy.get(":nth-child(" + num + ") > .product-price").then(($Prodp) => {
        ProductPrice = $Prodp.text();
        cy.get(GreenKartObj.NavPrice).should("contain.text", ProductPrice);
        cy.get(GreenKartObj.Cart).click();
        cy.get(GreenKartObj.CheckPrice).click();
        cy.get(GreenKartObj.CheckOut).click({ force: true });
        cy.get(GreenKartObj.CheckProdName).should("contain.text", ProductName);
        cy.get(GreenKartObj.CheckProdPrice).should(
          "contain.text",
          ProductPrice
        );
        cy.get(GreenKartObj.CheckTotalAmount).should(
          "contain.text",
          ProductPrice
        );
        cy.get(GreenKartObj.PlaceOrder).click();
        cy.get(GreenKartObj.SelectCountry)
          .select("Pakistan")
          .should("have.value", "Pakistan");
        cy.get(GreenKartObj.CheckAgree).check().should("be.checked");
        cy.get(GreenKartObj.ProceedOrder).click();
      });
    });
});
Then("User should see thankyou page", () => {

  cy.get(GreenKartObj.SeeThanks).should("contain.text",Thanks)
});
