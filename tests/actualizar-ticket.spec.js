const { test, expect } =
    require("@playwright/test");

const {
    CreateTicketPage
} = require("../pages/CreateTicketPage");

const {
    SearchTicketPage
} = require("../pages/SearchTicketPage");

const {
    UpdateTicketPage
} = require("../pages/UpdateTicketPage");

test("Actualizar ticket", async ({ page }) => {

    const timestamp = Date.now();

    const serie = `SERIE-${timestamp}`;

    const createPage =
        new CreateTicketPage(page);

    const searchPage =
        new SearchTicketPage(page);

    const updatePage =
        new UpdateTicketPage(page);

    // Crear

    await page.goto("/crear");

    await createPage.crearTicket({
        inventario: `QA-${timestamp}`,
        serie,
        problema: "Prueba actualización"
    });

    // Buscar

    await page.goto("/buscar");

    await searchPage.buscarPorSerie(serie);

    // Ir a Acciones

    await page.getByText("Acciones").click();

    // Actualizar

    await updatePage.actualizarTicket({
        observacion: "Actualizado por Playwright",
        ticketRimac: "RIMAC-QA",
        nroCaso: "CASO-QA"
    });

    // Volver a Información

    await page.getByTestId("tab-informacion").click();

    // Validar

    await expect(
        page.getByTestId("detalle-observacion")
    ).toContainText(
        "Actualizado por Playwright"
    );

});