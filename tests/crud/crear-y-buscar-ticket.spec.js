const {
    test,
    expect
} = require("../../fixtures/pages.fixture");

const {
    generateTicketData
} = require("../../utils/testData");

test("@crud @smoke @regression Crear y buscar ticket",
async ({
    page,
    createPage,
    searchPage
}) => {

    const ticket =
        generateTicketData();

    await page.goto("/crear");

    await createPage.crearTicket(ticket);

    await page.goto("/buscar");

    await searchPage.buscarPorSerie(
        ticket.serie
    );

    await expect(
        page.getByTestId("detalle-serie")
    ).toContainText(
        ticket.serie
    );

});
