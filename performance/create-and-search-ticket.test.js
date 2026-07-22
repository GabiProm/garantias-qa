import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 5,
    duration: "30s",
    thresholds: {
        http_req_failed: ["rate<0.05"],
        http_req_duration: ["p(95)<1500"]
    }
};

const BASE_URL =
    __ENV.BASE_URL || "http://localhost:5177/api";

export default function () {

    const timestamp =
        `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    const serie =
        `K6-SERIE-${timestamp}`;

    const payload =
        JSON.stringify({
            nroInventario: `K6-INV-${timestamp}`,
            serie,
            problema: "Ticket creado para búsqueda k6",
            procedeGarantia: true,
            tipoDano: 1
        });

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const createResponse =
        http.post(
            `${BASE_URL}/tickets`,
            payload,
            params
        );

    check(createResponse, {
        "ticket creado": (res) =>
            res.status === 200,

        "id generado": (res) =>
            res.json("id") !== undefined
    });

    const searchResponse =
        http.get(
            `${BASE_URL}/tickets/buscar?serie=${serie}`
        );

    check(searchResponse, {
        "búsqueda status 200": (res) =>
            res.status === 200,

        "serie encontrada": (res) =>
            res.json("serie") === serie
    });

    sleep(1);

}