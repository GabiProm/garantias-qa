import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
    stages: [
        { duration: "30s", target: 10 },
        { duration: "1m", target: 10 },
        { duration: "30s", target: 0 }
    ],
    thresholds: {
        http_req_failed: ["rate<0.05"],
        http_req_duration: ["p(95)<1500"]
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

        "respuesta es JSON": (res) =>
            res.headers["Content-Type"] &&
            res.headers["Content-Type"].includes("application/json")
    });

    sleep(1);

}