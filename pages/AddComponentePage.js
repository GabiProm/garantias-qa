class AddComponentePage {

    constructor(page) {

        this.page = page;

        this.nuevoComponente =
            page.getByTestId("txt-nuevo-componente");

        this.btnAgregar =
            page.getByTestId("btn-agregar-componente");
    }

    async agregarComponente(nombre) {

        await this.nuevoComponente.fill(nombre);

        await this.btnAgregar.click();
    }
}

module.exports = { AddComponentePage };