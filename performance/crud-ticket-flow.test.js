import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 3,
    duration: "30s",
    thresholds: {
        http_req_failed: ["rate<0.05"],
        http_req_duration: ["p(95)<2000"]
    }
};

const BASE_URL =
    __ENV.BASE_URL || "http://localhost:5177/api";

export default function () {

    const timestamp =
        `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const serie =
        `K6-SERIE-${timestamp}`;

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const createPayload =
        JSON.stringify({
            nroInventario: `K6-INV-${timestamp}`,
            serie,
            problema: "Ticket creado por flujo CRUD k6",
            procedeGarantia: true,
            tipoDano: 1
        });

    const createResponse =
        http.post(
            `${BASE_URL}/tickets`,
            createPayload,
            params
        );

    check(createResponse, {
        "crear ticket status 200": (res) =>
            res.status === 200,

        "crear ticket devuelve id": (res) =>
            res.json("id") !== undefined
    });

    const ticketId =
        createResponse.json("id");

    if (!ticketId) {
        return;
    }

    const searchResponse =
        http.get(
            `${BASE_URL}/tickets/buscar?serie=${serie}`
        );

    check(searchResponse, {
        "buscar ticket status 200": (res) =>
            res.status === 200,

        "buscar ticket por serie correcto": (res) =>
            res.json("serie") === serie
    });

    const updatePayload =
        JSON.stringify({
            observacion: "Actualizado por k6",
            ticketRimac: "RIMAC-K6",
            nroCaso: "CASO-K6",
            procedeGarantia: true,
            tipoDano: 1
        });

    const updateResponse =
        http.put(
            `${BASE_URL}/tickets/${ticketId}`,
            updatePayload,
            params
        );

    check(updateResponse, {
        "actualizar ticket status 200": (res) =>
            res.status === 200
    });

    const deleteResponse =
        http.del(
            `${BASE_URL}/tickets/${ticketId}`
        );

    check(deleteResponse, {
        "eliminar ticket status 200": (res) =>
            res.status === 200
    });

    sleep(1);

}