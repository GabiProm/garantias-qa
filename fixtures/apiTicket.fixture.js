const {
    test: base,
    expect
} = require("./pages.fixture");

const {
    createTicketByApi,
    deleteTicketByApi
} = require("../api/tickets.api");

const test = base.extend({

    apiTicket: async ({}, use) => {

        const ticket =
            await createTicketByApi();

        await use(ticket);

        await deleteTicketByApi(
            ticket.id
        );

    }

});

module.exports = {
    test,
    expect
};