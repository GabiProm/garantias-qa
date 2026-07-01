class UpdateTicketPage {

    constructor(page) {

        this.page = page;

        this.observacion =
            page.getByTestId("txt-observacion");

        this.ticketRimac =
            page.getByTestId("txt-ticket-rimac");

        this.nroCaso =
            page.getByTestId("txt-nro-caso");

        this.btnActualizar =
            page.getByTestId("btn-actualizar-ticket");
    }

    async actualizarTicket(data) {

        await this.observacion.fill(data.observacion);

        await this.ticketRimac.fill(data.ticketRimac);

        await this.nroCaso.fill(data.nroCaso);

        await this.btnActualizar.click();
    }
}

module.exports = { UpdateTicketPage };