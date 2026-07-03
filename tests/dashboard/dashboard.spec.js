const {
    test,
    expect
} = require("../../fixtures/pages.fixture");

test.describe("Dashboard", () => {

    test.beforeEach(async ({ page }) => {

        await page.goto("/dashboard");

    });

    test("@dashboard @smoke Dashboard carga correctamente",
    async ({ page }) => {

        await expect(
            page.getByTestId("kpi-total-tickets")
        ).toBeVisible();

        await expect(
            page.getByTestId("kpi-garantia-si")
        ).toBeVisible();

        await expect(
            page.getByTestId("kpi-abiertos")
        ).toBeVisible();

        await expect(
            page.getByTestId("kpi-cerrados")
        ).toBeVisible();

    });

    test("@dashboard @regression Dashboard muestra los graficos",
    async ({ page }) => {

        await expect(
            page.getByTestId("chart-garantias")
        ).toBeVisible();

        await expect(
            page.getByTestId("chart-tipo-dano")
        ).toBeVisible();

        await expect(
            page.getByTestId("chart-ranking")
        ).toBeVisible();

    });

    test("@dashboard @regression Filtro ultimos 7 dias funciona",
    async ({ page }) => {

        await page
            .getByTestId("btn-ultimos-7-dias")
            .click();

        await expect(
            page.getByTestId("kpi-total-tickets")
        ).toBeVisible();

    });

    test("@dashboard @regression Limpiar filtros funciona",
    async ({ page }) => {

        await page
            .getByTestId("btn-ultimos-7-dias")
            .click();

        await page
            .getByTestId("btn-limpiar-filtros")
            .click();

        await expect(
            page.getByTestId("filtro-fecha-desde")
        ).toHaveValue("");

        await expect(
            page.getByTestId("filtro-fecha-hasta")
        ).toHaveValue("");

    });

});