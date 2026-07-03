function generateTicketData() {

    const timestamp = Date.now();

    return {
        inventario: `QA-${timestamp}`,
        serie: `SERIE-${timestamp}`,
        problema: "Prueba Playwright"
    };

}

module.exports = {
    generateTicketData
};