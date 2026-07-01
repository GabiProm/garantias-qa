class SearchTicketPage {
    constructor(page) {

        this.page = page;

        this.serie = page.getByTestId("txt-buscar-serie");

        this.inventario =
            page.getByTestId("txt-buscar-inventario");

        this.btnBuscar =
            page.getByTestId("btn-buscar-ticket");
    }

    async buscarPorSerie(serie) {

        await this.serie.fill(serie);

        await this.btnBuscar.click();
    }
}

module.exports = { SearchTicketPage };