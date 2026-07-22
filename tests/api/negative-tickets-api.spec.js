const {
    test,
    expect,
    request
} = require("@playwright/test");

const API_BASE_URL =
    process.env.API_BASE_URL ||
    "http://localhost:5177/api";

test.describe(
    "@api @negative @regression Pruebas negativas API Tickets",
    () => {

        test(
            "@api @negative Crear ticket con payload invalido",
            async () => {

                const apiContext =
                    await request.newContext();

                const invalidPayload = {};

                const response =
                    await apiContext.post(
                        `${API_BASE_URL}/tickets`,
                        {
                            data: invalidPayload
                        }
                    );

                expect(
                    response.status()
                ).not.toBe(200);

                expect(
                    [
                        400,
                        422,
                        500
                    ]
                ).toContain(
                    response.status()
                );

            }
        );

        test(
            "@api @negative Buscar ticket inexistente por serie",
            async () => {

                const apiContext =
                    await request.newContext();

                const serieInexistente =
                    `NO-EXISTE-${Date.now()}`;

                const response =
                    await apiContext.get(
                        `${API_BASE_URL}/tickets/buscar?serie=${serieInexistente}`
                    );

                expect(
                    [
                        404,
                        204,
                        200
                    ]
                ).toContain(
                    response.status()
                );

                if (
                    response.status() === 200
                ) {

                    const body =
                        await response.json();

                    expect(
                        body === null ||
                        body.length === 0 ||
                        Object.keys(body).length === 0
                    ).toBeTruthy();

                }

            }
        );

        test(
            "@api @negative Actualizar ticket inexistente",
            async () => {

                const apiContext =
                    await request.newContext();

                const ticketIdInexistente =
                    999999999;

                const payload = {

                    observacion:
                        "Intento de actualizacion negativa",

                    ticketRimac:
                        "RIMAC-NEGATIVE",

                    nroCaso:
                        "CASO-NEGATIVE",

                    procedeGarantia:
                        true,

                    tipoDano:
                        1

                };

                const response =
                    await apiContext.put(
                        `${API_BASE_URL}/tickets/${ticketIdInexistente}`,
                        {
                            data: payload
                        }
                    );

                expect(
                    [
                        400,
                        404,
                        409
                    ]
                ).toContain(
                    response.status()
                );

            }
        );

        test(
            "@api @negative Eliminar ticket inexistente",
            async () => {

                const apiContext =
                    await request.newContext();

                const ticketIdInexistente =
                    999999999;

                const response =
                    await apiContext.delete(
                        `${API_BASE_URL}/tickets/${ticketIdInexistente}`
                    );

                expect(
                    [
                        400,
                        404,
                        409
                    ]
                ).toContain(
                    response.status()
                );

            }
        );

    }
);