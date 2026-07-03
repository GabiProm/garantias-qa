const {
    test,
    expect
} = require("../../fixtures/pages.fixture");

const {
    createTicketByApi,
    deleteTicketByApi,
    getTicketResponseById
} = require("../../api/tickets.api");

test("@apiui Eliminar ticket por API",
async () => {

    const ticket =
        await createTicketByApi();

    const deleted =
        await deleteTicketByApi(
            ticket.id
        );

    expect(deleted)
        .toBeTruthy();

    const response =
        await getTicketResponseById(
            ticket.id
        );

    expect(
        response.status()
    ).toBe(404);

});