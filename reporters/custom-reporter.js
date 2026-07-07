const fs = require("fs");
const path = require("path");

class CustomReporter {

    constructor() {

        this.passed = 0;
        this.failed = 0;
        this.skipped = 0;

        this.failedTests = [];

        this.startTime = 0;

    }

    onBegin() {

        this.startTime = Date.now();

    }

    onTestEnd(test, result) {

        if (result.status === "passed") {

            this.passed++;

        }

        if (result.status === "failed") {

            this.failed++;

            this.failedTests.push({
                title: test.title
            });

        }

        if (result.status === "skipped") {

            this.skipped++;

        }

    }

    onEnd(result) {

        const durationSeconds =
            Number(
                (
                    (Date.now() - this.startTime)
                    / 1000
                ).toFixed(2)
            );

        const totalTests =
            this.passed +
            this.failed +
            this.skipped;

        const successRate =
            totalTests === 0
                ? 0
                : Number(
                    (
                        (this.passed / totalTests) * 100
                    ).toFixed(2)
                );

        const summary = {

            executionDate:
                new Date().toISOString(),

            status:
                result.status,

            totalTests,

            passed:
                this.passed,

            failed:
                this.failed,

            skipped:
                this.skipped,

            successRate,

            durationSeconds,

            failedTests:
                this.failedTests

        };

        const reportsDir =
            path.join(
                process.cwd(),
                "reports"
            );

        const historyDir =
            path.join(
                reportsDir,
                "history"
            );

        const timestamp =
            new Date()
                .toISOString()
                .replace(/:/g, "-")
                .replace(/\./g, "-");

        fs.mkdirSync(
            reportsDir,
            {
                recursive: true
            }
        );
        
        fs.mkdirSync(
            historyDir,
            {
                recursive: true
            }
        );

        fs.writeFileSync(
            path.join(
                reportsDir,
                "qa-summary.json"
            ),
            JSON.stringify(
                summary,
                null,
                2
            )
        );

        fs.writeFileSync(
            path.join(
                historyDir,
                `${timestamp}.json`
            ),
            JSON.stringify(
                summary,
                null,
                2
            )
        );

        const statusColor =
            result.status === "passed"
                ? "#16a34a"
                : "#dc2626";

        const html = `
            <!DOCTYPE html>
            <html lang="es">

            <head>

            <meta charset="UTF-8">

            <title>
            Reporte Ejecutivo QA
            </title>

            <style>

            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
            }

            body{

                font-family:
                    'Segoe UI',
                    sans-serif;

                background:
                    #f3f4f6;

                padding:
                    30px;

            }

            .container{

                max-width:
                    1200px;

                margin:
                    auto;

            }

            .header{

                background:
                    linear-gradient(
                        135deg,
                        #2563eb,
                        #1e40af
                    );

                color:
                    white;

                padding:
                    30px;

                border-radius:
                    16px;

                margin-bottom:
                    25px;

                box-shadow:
                    0 4px 12px rgba(0,0,0,.15);

            }

            .header h1{

                margin-bottom:
                    10px;

            }

            .grid{

                display:
                    grid;

                grid-template-columns:
                    repeat(auto-fit,minmax(220px,1fr));

                gap:
                    20px;

                margin-bottom:
                    25px;

            }

            .card{

                background:
                    white;

                padding:
                    20px;

                border-radius:
                    12px;

                box-shadow:
                    0 2px 10px rgba(0,0,0,.1);

            }

            .card-title{

                color:
                    #6b7280;

                font-size:
                    14px;

                margin-bottom:
                    10px;

            }

            .card-value{

                font-size:
                    32px;

                font-weight:
                    bold;

            }

            .passed{

                color:
                    #16a34a;

            }

            .failed{

                color:
                    #dc2626;

            }

            .skipped{

                color:
                    #d97706;

            }

            .section{

                background:
                    white;

                padding:
                    25px;

                border-radius:
                    12px;

                box-shadow:
                    0 2px 10px rgba(0,0,0,.1);

                margin-bottom:
                    25px;

            }

            .status{

                color:
                    ${statusColor};

                font-weight:
                    bold;

                font-size:
                    18px;

            }

            table{

                width:
                    100%;

                border-collapse:
                    collapse;

                margin-top:
                    15px;

            }

            th{

                background:
                    #2563eb;

                color:
                    white;

                text-align:
                    left;

                padding:
                    12px;

            }

            td{

                padding:
                    12px;

                border-bottom:
                    1px solid #e5e7eb;

            }

            .success-rate{

                font-size:
                    40px;

                font-weight:
                    bold;

                color:
                    #2563eb;

                text-align:
                    center;

            }

            .footer{

                text-align:
                    center;

                color:
                    #6b7280;

                margin-top:
                    20px;

            }

            </style>

            </head>

            <body>

            <div class="container">

            <div class="header">

            <h1>
            📊 Reporte Ejecutivo QA
            </h1>

            <p>
            Framework de Automatización - Garantias QA
            </p>

            </div>

            <div class="grid">

            <div class="card">
            <div class="card-title">
            Total de Tests
            </div>
            <div class="card-value">
            ${totalTests}
            </div>
            </div>

            <div class="card">
            <div class="card-title">
            ✅ Passed
            </div>
            <div class="card-value passed">
            ${this.passed}
            </div>
            </div>

            <div class="card">
            <div class="card-title">
            ❌ Failed
            </div>
            <div class="card-value failed">
            ${this.failed}
            </div>
            </div>

            <div class="card">
            <div class="card-title">
            ⏭ Skipped
            </div>
            <div class="card-value skipped">
            ${this.skipped}
            </div>
            </div>

            </div>

            <div class="section">

            <h2>
            🏁 Resultado General
            </h2>

            <br>

            <p class="status">
            ${result.status.toUpperCase()}
            </p>

            </div>

            <div class="section">

            <h2>
            📈 Success Rate
            </h2>

            <br>

            <div class="success-rate">
            ${successRate}%
            </div>

            </div>

            <div class="section">

            <h2>
            ⏱ Resumen de Ejecución
            </h2>

            <br>

            <p>
            <strong>Fecha:</strong>
            ${new Date().toLocaleString()}
            </p>

            <br>

            <p>
            <strong>Duración:</strong>
            ${durationSeconds} segundos
            </p>

            </div>

            <div class="section">

            <h2>
            ❌ Pruebas Fallidas
            </h2>

            ${
            this.failedTests.length === 0
            ?
            `
            <br>
            <p>
            ✅ No se registraron pruebas fallidas.
            </p>
            `
            :
            `
            <table>

            <thead>

            <tr>
            <th>#</th>
            <th>Prueba</th>
            </tr>

            </thead>

            <tbody>

            ${this.failedTests
            .map(
                (test, index) =>
            `
            <tr>
            <td>${index + 1}</td>
            <td>${test.title}</td>
            </tr>
            `
            )
            .join("")}

            </tbody>

            </table>
            `
            }

            </div>

            <div class="footer">

            Reporte generado automáticamente por Playwright Custom Reporter

            </div>

            </div>

            </body>

            </html>
            `;

        fs.writeFileSync(
            path.join(
                reportsDir,
                "qa-summary.html"
            ),
            html
        );
 
        fs.writeFileSync(
            path.join(
                historyDir,
                `${timestamp}.html`
            ),
            html
        );

    }

}

module.exports = CustomReporter;