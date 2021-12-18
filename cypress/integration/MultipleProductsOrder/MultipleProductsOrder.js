/// <reference types = "Cypress"/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { GreenKartObj } from "../../pageObjects/GreenKartObj";

let ProductName1, ProductPrice1, ProductName2, ProductPrice2;
let Thanks =
  "Thank you, your order has been placed successfully  You'll be redirected to Home page shortly!!";
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
  let num1 = getRandomInt(1, 30);
  cy.get(":nth-child(" + num1 + ") > .product-action > button").click();
  cy.get(":nth-child(" + num1 + ") > .product-name").then(($ProdName) => {
    ProductName1 = $ProdName.text();
    console.log(ProductName1);
    cy.get(":nth-child(" + num1 + ") > .product-price").then(($Prodp) => {
      ProductPrice1 = parseInt($Prodp.text());

      let num2 = getRandomInt(1, 30);
      cy.get(":nth-child(" + num2 + ") > .product-action > button").click();
      cy.get(":nth-child(" + num2 + ") > .product-name").then(($ProdName) => {
        ProductName2 = $ProdName.text();
        cy.get(":nth-child(" + num2 + ") > .product-price").then(($Prodp) => {
          ProductPrice2 = parseInt($Prodp.text());
          cy.get(GreenKartObj.NavPrice).should(
            "contain.text",
            parseInt(ProductPrice1) + parseInt(ProductPrice2)
          );
          cy.get(GreenKartObj.Cart).click();
          cy.get(GreenKartObj.CheckPrice).click();
          cy.get(GreenKartObj.CheckOut).click({ force: true });
          
          cy.get(GreenKartObj.CheckFirstProd).should(
            "contain.text",
            ProductName1
          );
          cy.get(GreenKartObj.CheckScendProd).should(
            "contain.text",
            ProductName2
          );
          cy.get(GreenKartObj.CheckProdPrice).should(
            "contain.text",
            ProductPrice1
          );
          cy.get(GreenKartObj.CheckProdPrice).should(
            "contain.text",
            ProductPrice2
          );
          cy.get(GreenKartObj.CheckTotalAmount).should(
            "contain.text",
            parseInt(ProductPrice1) + parseInt(ProductPrice2)
          );
        });
      });
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
  cy.get(GreenKartObj.SeeThanks).should("contain.text", Thanks);
});
