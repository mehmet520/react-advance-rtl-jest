/* eslint-env mocha */
// Add 'describe' and 'cy' to the global comment so ESLint knows they're provided by the Mocha/Cypress environment.
// Declare 'cy' as a global for ESLint by adding it to the /* global ... */ comment at the top of the file.
/* global describe it cy */
// cypress/e2e/kullanicilarListesi.cy.js

describe("Kullanici Listesi", () => {
  it("listeyi gösterir, arama yapar ve detaya gider", () => {
    // Backend cagrisini stub'layalim (istege bagli)
    cy.intercept("GET", "/api/kullanicilar", {
      statusCode: 200,
      body: [
        { id: 1, ad: "Ali" },
        { id: 2, ad: "Ayşe" },
        { id: 3, ad: "Mehmet" },
      ],
    }).as('getKullanicilar');

    // Uygulamayi ac
    cy.visit('http://localhost:5173/kullanicilar');

    // API cagrisinin tamamlanmasini bekle
    cy.wait('@getKullanicilar');

    // Liste gercekten DOM'da gorunuyor mu?
    cy.contains('Ali').should('exist');
    cy.contains('Ayse').should('exist');
    cy.contains('Mehmet').should('exist');

    //Arama kutusuna yaz
    cy.get("input[placeholder='Ara']").type('Ali');

    // Filtre sonrasi kontroller
    cy.contains('Ali').should('exist');
    cy.contains('Ayse').should('not.exist');
    cy.contains('Mehmet').should('not.exist');

    // Detay butonuna tikla
    cy.contains('li', 'Ali').within(()=>{
        cy.contains('Detay').click();
    });

    // Yeni sayfada oldugumuzu dogrula
    cy.url().should('include', '/kullanicilar/1');
    // Ornegin detay sayfasinda bir baslik:
    cy.contains('Kullanici Detay').should('exist');
  });


});
