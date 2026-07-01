const { test, expect } = require("@playwright/test");

test.describe("Dashboard", () => {

    test("Dashboard carga correctamente", async ({ page }) => {

        await page.goto("/dashboard");

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

    test("Dashboard muestra los graficos", async ({ page }) => {

        await page.goto("/dashboard");

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

    test("Filtro ultimos 7 dias funciona", async ({ page }) => {

        await page.goto("/dashboard");

        await page
            .getByTestId("btn-ultimos-7-dias")
            .click();

        await expect(
            page.getByTestId("kpi-total-tickets")
        ).toBeVisible();

    });

    test("Limpiar filtros funciona", async ({ page }) => {

        await page.goto("/dashboard");

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