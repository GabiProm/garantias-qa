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

    const payload =
        JSON.stringify({
            nroInventario: `K6-INV-${timestamp}`,
            serie: `K6-SERIE-${timestamp}`,
            problema: "Ticket creado por k6",
            procedeGarantia: true,
            tipoDano: 1
        });

    const params = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const response =
        http.post(
            `${BASE_URL}/tickets`,
            payload,
            params
        );

    check(response, {
        "status es 200": (res) =>
            res.status === 200,

        "respuesta contiene id": (res) =>
            res.json("id") !== undefined,

        "respuesta menor a 1500ms": (res) =>
            res.timings.duration < 1500
    });

    sleep(1);

}