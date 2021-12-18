/// <reference types ="Cypress"/>

before("Going to Url",function(){
    let url = "https://rahulshettyacademy.com/seleniumPractise";
    cy.visit(url);

})