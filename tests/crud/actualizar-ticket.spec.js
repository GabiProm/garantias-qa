const {
    test,
    expect
} = require("../../fixtures/ticket.fixture");

test("@crud @regression Actualizar ticket",
async ({
    page,
    createdTicket,
    updatePage
}) => {

    await page.getByText("Acciones").click();

    await updatePage.actualizarTicket({
        observacion: "Actualizado por Playwright",
        ticketRimac: "RIMAC-QA",
        nroCaso: "CASO-QA"
    });

    await page
        .getByTestId("tab-informacion")
        .click();

    await expect(
        page.getByTestId("detalle-observacion")
    ).toContainText(
        "Actualizado por Playwright"
    );

});