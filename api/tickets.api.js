const { request } = require("@playwright/test");

async function createTicketByApi() {

    const apiContext = await request.newContext();

    const timestamp = Date.now();

    const payload = {
        nroInventario: `API-${timestamp}`,
        serie: `SERIE-${timestamp}`,
        problema: "Ticket creado por API",
        procedeGarantia: true,
        tipoDano: 1
    };

    const response = await apiContext.post(
        "http://localhost:5177/api/tickets",
        {
            data: payload
        }
    );

    const data = await response.json();

    return {
        id: data.id,
        serie: data.serie,
        nroInventario: data.nroInventario
    };
}

async function getTicketById(id) {

    const apiContext = await request.newContext();

    const response = await apiContext.get(
        `http://localhost:5177/api/tickets/${id}`
    );

    return await response.json();
}

async function deleteTicketByApi(id) {

    const apiContext =
        await request.newContext();

    const response =
        await apiContext.delete(
            `http://localhost:5177/api/tickets/${id}`
        );

    return response.ok();

}

async function getTicketResponseById(id) {

    const apiContext =
        await request.newContext();

    return await apiContext.get(
        `http://localhost:5177/api/tickets/${id}`
    );

}

module.exports = {
    createTicketByApi,
    getTicketById,
    getTicketResponseById,
    deleteTicketByApi
};