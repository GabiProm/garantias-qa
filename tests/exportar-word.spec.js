const { test, expect } = require("@playwright/test");

test("Exportar informe Word", async ({ page }) => {

    await page.goto("/dashboard");

    const downloadPromise =
        page.waitForEvent("download");

    await page
        .getByTestId("btn-exportar-word")
        .click();

    const download =
        await downloadPromise;

    await download.saveAs(
        `evidences/${download.suggestedFilename()}`
    );

    expect(
        download.suggestedFilename()
    ).toBe("Informe_Mensual.docx");

});