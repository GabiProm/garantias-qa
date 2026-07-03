const {
    test,
    expect
} = require("../../fixtures/apiTicket.fixture");

const {
    getTicketById
} = require("../../api/tickets.api");

test("@apiui @regression API UI API actualizar ticket",
async ({
    page,
    searchPage,
    updatePage,
    apiTicket
}) => {

    const ticket = apiTicket;

    await page.goto("/buscar");

    await searchPage.buscarPorSerie(
        ticket.serie
    );

    await page
        .getByText("Acciones")
        .click();

    await updatePage.actualizarTicket({

        observacion:
            "Actualizado por API-UI-API",

        ticketRimac:
            "RIMAC-AUTOMATION",

        nroCaso:
            "CASO-AUTOMATION"

    });

    await page
        .getByTestId("tab-informacion")
        .click();

    await expect(
        page.getByTestId("detalle-observacion")
    ).toContainText(
        "Actualizado por API-UI-API"
    );

    const updatedTicket =
        await getTicketById(
            ticket.id
        );

    expect(
        updatedTicket.observacion
    ).toContain(
        "Actualizado por API-UI-API"
    );

    expect(
        updatedTicket.ticketRimac
    ).toContain(
        "RIMAC-AUTOMATION"
    );

    expect(
        updatedTicket.nroCaso
    ).toContain(
        "CASO-AUTOMATION"
    );

});