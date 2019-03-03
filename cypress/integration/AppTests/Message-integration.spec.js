describe("real tests", () => {
  before(() => {
    cy.visit("http://localhost:3000");
    cy.get("#inputPostForm").type("It's wednesday my dudes...");
    cy.get("#createPostButton").click();
  });
  it("visited app", () => {
    cy.contains("Hello world!");
  });
  it("should post message", () => {
    cy.get("#message-0 > div").should(element => {
      expect(element).to.contain("It's wednesday my dudes...");
    });
  });
  it("should edit message and save", () => {
    cy.get("#message-0").within(() => {
      cy.get(".editButton").click();
      cy.get(".editMessageArea").type("but not for long!");
      cy.get(".saveButton").click();
      cy.get(".messageText").should(
        "have.text",
        "It's wednesday my dudes...but not for long!"
      );
    });
  });
  it("should cancel edit on close", () => {
    cy.get("#message-0").within(() => {
      cy.get(".editButton").click();
      cy.get(".editMessageArea").type(" It's almost the weekend!");
      cy.get(".closeEditOptions").click();
      cy.get(".messageText").should(
        "have.text",
        "It's wednesday my dudes...but not for long!"
      );
    });
  });
  it("should not be visible when delete button clicked", () => {
    cy.get("#message-0").within(() => {
      cy.get(".editButton").click();
      cy.get(".deleteButton").click();
    });
    cy.get("#message-0 ").should("not.be.visible");
  });
});
