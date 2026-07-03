const {
    test: base,
    expect
} = require("./pages.fixture");

const {
    generateTicketData
} = require("../utils/testData");

const test = base.extend({

    createdTicket: async (
        {
            page,
            createPage,
            searchPage
        },
        use
    ) => {

        const ticket =
            generateTicketData();

        await page.goto("/crear");

        await createPage.crearTicket(ticket);

        await page.goto("/buscar");

        await searchPage.buscarPorSerie(
            ticket.serie
        );

        await use(ticket);

    }

});

module.exports = {
    test,
    expect
};