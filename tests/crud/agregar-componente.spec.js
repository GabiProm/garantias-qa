const {
    test,
    expect
} = require("../../fixtures/ticket.fixture");

test("@crud @regression Agregar componente a ticket",
async ({
    page,
    createdTicket,
    componentePage
}) => {

    await page
        .getByTestId("tab-acciones")
        .click();

    const nombreComponente =
        `COMP-QA-${Date.now()}`;

    await componentePage.agregarComponente(
        nombreComponente
    );

    await page
        .getByTestId("tab-componentes")
        .click();

    await expect(
        page.getByTestId("detalle-componente")
    ).toContainText(
        nombreComponente
    );

});