import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [
        { duration: "30s", target: 20 },
        { duration: "1m", target: 50 },
        { duration: "1m", target: 100 },
        { duration: "30s", target: 0 }
    ],
    thresholds: {
        http_req_failed: ["rate<0.10"],
        http_req_duration: ["p(95)<3000"]
    }
};

const BASE_URL =
    __ENV.BASE_URL || "http://localhost:5177/api";

export default function () {

    const response =
        http.get(`${BASE_URL}/tickets`);

    check(response, {
        "status no es 500": (res) =>
            res.status !== 500,

        "status aceptable": (res) =>
            [200, 204, 400, 404].includes(res.status)
    });

    sleep(1);

}