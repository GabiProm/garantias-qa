const { test, expect } =
    require("@playwright/test");

const {
    CreateTicketPage
} = require("../pages/CreateTicketPage");

const {
    SearchTicketPage
} = require("../pages/SearchTicketPage");

test("Crear y buscar ticket", async ({ page }) => {

    const timestamp = Date.now();

    const inventario = `QA-${timestamp}`;
    const serie = `SERIE-${timestamp}`;

    const createPage =
        new CreateTicketPage(page);

    const searchPage =
        new SearchTicketPage(page);

    // Crear

    await page.goto("/crear");

    await createPage.crearTicket({
        inventario,
        serie,
        problema: "Prueba E2E"
    });
    
    await page.pause();
    // Buscar
    
    await page.goto("/buscar");

    await searchPage.buscarPorSerie(serie);

    // Validar detalle

    await expect(
        page.getByTestId("detalle-serie")
    ).toContainText(serie);

});