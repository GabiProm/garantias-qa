const { test, expect } = require("@playwright/test");
const { CreateTicketPage } = require("../pages/CreateTicketPage");

test("Crear ticket correctamente", async ({ page }) => {

    const ticketPage = new CreateTicketPage(page);

    const timestamp = Date.now();

    await page.goto("/crear");

    await ticketPage.crearTicket({
        inventario: `QA-${timestamp}`,
        serie: `SERIE-${timestamp}`,
        problema: "Prueba Playwright"
    });

    // Validar que el formulario se limpió
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