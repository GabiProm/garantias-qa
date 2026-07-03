const {
    test,
    expect
} = require("../../fixtures/pages.fixture");

const {
    generateTicketData
} = require("../../utils/testData");

test("@crud @smoke @regression Crear ticket correctamente",
async ({
    page,
    createPage
}) => {

    const ticket =
        generateTicketData();

    await page.goto("/crear");

    await createPage.crearTicket(ticket);

    await expect(
        page.getByTestId("txt-inventario")
    ).toHaveValue("");

    await expect(
        page.getByTestId("txt-serie")
    ).toHaveValue("");

    await expect(
        page.getByTestId("txt-problema")
    ).toHaveValue("");

});