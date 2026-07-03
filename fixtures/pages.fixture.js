const base =
    require("@playwright/test");

const {
    CreateTicketPage
} = require("../pages/CreateTicketPage");

const {
    SearchTicketPage
} = require("../pages/SearchTicketPage");

const {
    UpdateTicketPage
} = require("../pages/UpdateTicketPage");

const {
    AddComponentePage
} = require("../pages/AddComponentePage");

exports.test = base.test.extend({

    createPage: async (
        { page },
        use
    ) => {

        await use(
            new CreateTicketPage(page)
        );

    },

    searchPage: async (
        { page },
        use
    ) => {

        await use(
            new SearchTicketPage(page)
        );

    },

    updatePage: async (
        { page },
        use
    ) => {

        await use(
            new UpdateTicketPage(page)
        );

    },

    componentePage: async (
        { page },
        use
    ) => {

        await use(
            new AddComponentePage(page)
        );

    }

});

exports.expect = base.expect;