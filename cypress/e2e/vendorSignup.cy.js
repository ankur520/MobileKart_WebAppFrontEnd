//  <refrence types="cypress" />

describe("VendorSign.js SIGNUP E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/vendorsignup");
    cy.get("div[data-cy='vendorSignInSignUp']").should("exist");

    // all fields must
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']"
    ).should("exist");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']"
    ).should("exist");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    ).should("exist");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup button']"
    ).should("exist");

    // must empty
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']"
    ).should("have.value", "");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']"
    ).should("have.value", "");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    ).should("have.value", "");
    // type in inputs
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']")
      .type("fakefirstname", { force: true })
      .should("have.value", "fakefirstname");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']")
      .type("fakeemail@gmail.com", { force: true })
      .should("have.value", "fakeemail@gmail.com");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    )
      .type("fakepassword", { force: true })
      .should("have.value", "fakepassword");
    // submit button should be disabled
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup button']"
    ).should("be.disabled");
    // try to click on submit btn
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup button']"
    ).click({ force: true });

    // try to clear
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']"
    ).clear({ force: true });
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']"
    ).clear({ force: true });
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    ).clear({ force: true });
  });

  it("New User Sign Up Please Add new Email Address Manually ", () => {
    // proceed for sign up
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']")
      .type("fakefirstname", { force: true })
      .should("have.value", "fakefirstname");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']")
      .type("fakeemail@gmail.com", { force: true })
      .should("have.value", "fakeemail@gmail.com");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    )
      .type("fakepassword", { force: true })
      .should("have.value", "fakepassword");

    // click on terms and condition
    cy.get("div[data-cy='vendorSignInSignUp'] label#signUpTerms").click({
      force: true,
    });
    cy.wait(500);
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[data-cy='signup button']"
    ).click({ force: true });
    cy.wait(1000);
    // submit button not disabled
    cy.on("window:alert", (t) => {
      expect(t).to.contains("VendorSignUpSuccessfull");
    });

    // div[data-cy='vendorSignInSignUp'] input[ data-cy="signup fname"]

    // userSignUpSuccessfull
  });

  it("User Sign Up Already Exist", () => {
    // proceed for sign up
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup fname']")
      .type("fakefirstname", { force: true })
      .should("have.value", "fakefirstname");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='signup email']")
      .type("fakeemail@gmail.com", { force: true })
      .should("have.value", "fakeemail@gmail.com");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='signup password']"
    )
      .type("fakepassword", { force: true })
      .should("have.value", "fakepassword");

    // click on terms and condition
    cy.get("div[data-cy='vendorSignInSignUp'] label#signUpTerms").click({
      force: true,
    });
    cy.wait(500);
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[data-cy='signup button']"
    ).click({ force: true });
    cy.wait(1000);
    // submit button not disabled
    cy.on("window:alert", (t) => {
      expect(t).to.contains("EmailAlreadyExist");
    });
  });
});

describe("VendorSign.js Login E2E", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/vendorsignup");
    cy.get("div[data-cy='vendorSignInSignUp']").should("exist");

    // all fields must
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']"
    ).should("exist");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']"
    ).should("exist");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login button']"
    ).should("exist");

    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']"
    ).should("have.value", "");
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']"
    ).should("have.value", "");
    // type in inputs
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']")
      .type("fakeemail@gmail.com", { force: true })
      .should("have.value", "fakeemail@gmail.com");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']")
      .type("fakepassword", { force: true })
      .should("have.value", "fakepassword");
    // submit button should be disabled
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login button']"
    ).should("be.disabled");

    // try to clear
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']"
    ).clear({ force: true });
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']"
    ).clear({ force: true });
  });

  it("Login User Not Exist", () => {
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']")
      .type("fa23423423il@gmail.com", { force: true })
      .should("have.value", "fa23423423il@gmail.com");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']")
      .type("fakepassword", { force: true })
      .should("have.value", "fakepassword");

    // // click on terms and condition
    cy.get("div[data-cy='vendorSignInSignUp'] label#loginTerms").click({
      force: true,
    });
    cy.wait(500);
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[data-cy='login button']"
    ).click({ force: true });
    cy.wait(500);
    // // submit button not disabled
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Incorrect Email Address");
    });
  });

  it("Login Wrong Password", () => {
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']")
      .type("fakeemail@gmail.com", { force: true })
      .should("have.value", "fakeemail@gmail.com");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']")
      .type("wrongPassword", { force: true })
      .should("have.value", "wrongPassword");

    // // click on terms and condition
    cy.get("div[data-cy='vendorSignInSignUp'] label#loginTerms").click({
      force: true,
    });
    cy.wait(500);
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[data-cy='login button']"
    ).click({ force: true });
    cy.wait(500);
    // // submit button not disabled
    cy.on("window:alert", (t) => {
      expect(t).to.contains("Wrong Password");
    });
  });

  it("Login Correct Details will redirect to user dashboard then logout", () => {
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Email']")
      .type("vendor@gmail.com", { force: true })
      .should("have.value", "vendor@gmail.com");
    cy.get("div[data-cy='vendorSignInSignUp'] input[ data-cy='login Password']")
      .type("vendor", { force: true })
      .should("have.value", "vendor");

    // // click on terms and condition
    cy.get("div[data-cy='vendorSignInSignUp'] label#loginTerms").click({
      force: true,
    });
    cy.get(
      "div[data-cy='vendorSignInSignUp'] input[data-cy='login button']"
    ).click({ force: true });

    cy.wait(3000);

    cy.get(
      'div[data-cy="vendorDashboard"] h4[data-cy="vendorWelcomeMsg"]'
    ).should("have.text", "Vendor Dashboard");
    cy.wait(100);
    cy.get(
      "div[data-cy='vendorDashboardJunction'] a[data-cy='vendorDashboardLogoutBtn']"
    )
      .should("exist")
      .click();
  });
});
