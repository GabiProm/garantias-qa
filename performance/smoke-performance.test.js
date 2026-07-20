import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    vus: 1,
    duration: "10s",
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(95)<1000"]
    }
};

const BASE_URL =
    __ENV.BASE_URL || "http://localhost:5177/api";

export default function () {

    const response =
        http.get(`${BASE_URL}/tickets`);

    check(response, {
        "status es 200": (res) =>
            res.status === 200,

        "respuesta menor a 1000ms": (res) =>
            res.timings.duration < 1000
    });

    sleep(1);

}