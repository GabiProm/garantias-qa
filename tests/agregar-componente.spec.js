const { test, expect } =
    require("@playwright/test");

const {
    CreateTicketPage
} = require("../pages/CreateTicketPage");

const {
    SearchTicketPage
} = require("../pages/SearchTicketPage");

const {
    AddComponentePage
} = require("../pages/AddComponentePage");

test("Agregar componente a ticket", async ({ page }) => {

    const timestamp = Date.now();

    const serie = `SERIE-${timestamp}`;

    const createPage =
        new CreateTicketPage(page);

    const searchPage =
        new SearchTicketPage(page);

    const componentePage =
        new AddComponentePage(page);

    // Crear

    await page.goto("/crear");

    await createPage.crearTicket({
        inventario: `QA-${timestamp}`,
        serie,
        problema: "Prueba componente"
    });

    // Buscar

    await page.goto("/buscar");

    await searchPage.buscarPorSerie(serie);

    // Acciones

    await page.getByTestId("tab-acciones").click();

    const nombreComponente =
        `COMP-QA-${timestamp}`;

    await componentePage.agregarComponente(
        nombreComponente
    );

    // Verificar

    await page.getByTestId("tab-componentes").click();

    await expect(
        page.getByTestId("detalle-componente")
    ).toContainText(nombreComponente);

});