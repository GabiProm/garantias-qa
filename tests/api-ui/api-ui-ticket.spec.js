const {
    test,
    expect
} = require("../../fixtures/apiTicket.fixture");

test("@apiui @smoke API crea ticket y UI lo encuentra",
async ({
    page,
    searchPage,
    apiTicket
}) => {

    const ticket = apiTicket;

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