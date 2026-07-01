const { expect } = require("@playwright/test");

class CreateTicketPage {

  constructor(page) {
    this.page = page;

    this.inventario = page.getByTestId("txt-inventario");
    this.serie = page.getByTestId("txt-serie");
    this.problema = page.getByTestId("txt-problema");

    this.btnCrear = page.getByTestId("btn-crear-ticket");
  }

  async crearTicket(data) {

    await this.inventario.fill(data.inventario);
    await this.serie.fill(data.serie);
    await this.problema.fill(data.problema);

    await this.btnCrear.click();

    await expect(this.inventario).toHaveValue("");
    await expect(this.serie).toHaveValue("");
    await expect(this.problema).toHaveValue("");
  }
}

module.exports = { CreateTicketPage };