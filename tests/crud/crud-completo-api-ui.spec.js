const {
    test,
    expect
} = require("../../fixtures/pages.fixture");

const {
    createTicketByApi,
    getTicketById,
    getTicketResponseById,
    deleteTicketByApi
} = require("../../api/tickets.api");

test("@crud @apiui @regression CRUD completo API UI",
async ({
    page,
    searchPage,
    updatePage
}) => {

    // =========================
    // CREATE
    // =========================

    const ticket =
        await createTicketByApi();

    expect(ticket.id)
        .toBeTruthy();

    // =========================
    // READ (UI)
    // =========================

    await page.goto("/buscar");

    await searchPage.buscarPorSerie(
        ticket.serie
    );

    await expect(
        page.getByTestId("detalle-serie")
    ).toContainText(
        ticket.serie
    );

    // =========================
    // UPDATE (UI)
    // =========================

    await page
        .getByText("Acciones")
        .click();

    await updatePage.actualizarTicket({

        observacion:
            "CRUD COMPLETO PLAYWRIGHT",

        ticketRimac:
            "RIMAC-CRUD",

        nroCaso:
            "CASO-CRUD"

    });

    await page
        .getByTestId("tab-informacion")
        .click();

    await expect(
        page.getByTestId("detalle-observacion")
    ).toContainText(
        "CRUD COMPLETO PLAYWRIGHT"
    );

    // =========================
    // VALIDATE UPDATE (API)
    // =========================

    const updatedTicket =
        await getTicketById(
            ticket.id
        );

    expect(
        updatedTicket.observacion
    ).toContain(
        "CRUD COMPLETO PLAYWRIGHT"
    );

    expect(
        updatedTicket.ticketRimac
    ).toContain(
        "RIMAC-CRUD"
    );

    expect(
        updatedTicket.nroCaso
    ).toContain(
        "CASO-CRUD"
    );

    // =========================
    // DELETE
    // =========================

    const deleted =
        await deleteTicketByApi(
            ticket.id
        );

    expect(deleted)
        .toBeTruthy();

    // =========================
    // VALIDATE DELETE
    // =========================

    const response =
        await getTicketResponseById(
            ticket.id
        );

    expect(
        response.status()
    ).toBe(404);

});