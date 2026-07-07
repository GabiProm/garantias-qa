async function loadDashboard() {

    try {

        const summaryResponse =
            await fetch("/reports/qa-summary.json");

        const summary =
            await summaryResponse.json();

        loadSummary(summary);

        const historyResponse =
            await fetch("./history.json");

        const history =
            await historyResponse.json();

        buildHistoryTable(history);

        buildSuccessChart(history);

        buildDurationChart(history);

        buildFlakyTests(history);

    }
    catch (error) {

        console.error(error);

        alert(
            "Error cargando información del Dashboard"
        );

    }

}

function loadSummary(summary) {

    document.getElementById(
        "totalTests"
    ).textContent =
        summary.totalTests;

    document.getElementById(
        "passed"
    ).textContent =
        summary.passed;

    document.getElementById(
        "failed"
    ).textContent =
        summary.failed;

    document.getElementById(
        "successRate"
    ).textContent =
        `${summary.successRate}%`;

    document.getElementById(
        "status"
    ).textContent =
        summary.status;

    document.getElementById(
        "duration"
    ).textContent =
        `${summary.durationSeconds} segundos`;

    document.getElementById(
        "executionDate"
    ).textContent =
        new Date(
            summary.executionDate
        ).toLocaleString();

    const failedTests =
        document.getElementById(
            "failedTests"
        );

    failedTests.innerHTML = "";

    if (
        !summary.failedTests ||
        summary.failedTests.length === 0
    ) {

        failedTests.innerHTML =
            "<li>✅ No hay pruebas fallidas</li>";

        return;

    }

    summary.failedTests.forEach(test => {

        const li =
            document.createElement("li");

        li.textContent =
            test.title;

        failedTests.appendChild(li);

    });

}

function buildHistoryTable(history) {

    const tbody =
        document.querySelector(
            "#historyTable tbody"
        );

    tbody.innerHTML = "";

    history
        .slice(-10)
        .reverse()
        .forEach(run => {

            tbody.innerHTML += `
                <tr>
                    <td>${new Date(run.executionDate).toLocaleString()}</td>
                    <td>${run.status}</td>
                    <td>${run.successRate}%</td>
                    <td>${run.durationSeconds}s</td>
                </tr>
            `;

        });

}

function buildSuccessChart(history) {

    new Chart(
        document.getElementById("successChart"),
        {
            type: "line",

            data: {

                labels:
                    history.map(
                        (_, index) => index + 1
                    ),

                datasets: [
                    {
                        label: "Success Rate",

                        data:
                            history.map(
                                h => h.successRate
                            ),

                        borderColor: "#2563eb",

                        backgroundColor:
                            "rgba(37,99,235,.2)",

                        tension: 0.3,

                        fill: true
                    }
                ]
            }
        }
    );

}

function buildDurationChart(history) {

    new Chart(
        document.getElementById("durationChart"),
        {
            type: "bar",

            data: {

                labels:
                    history.map(
                        (_, index) => index + 1
                    ),

                datasets: [
                    {
                        label: "Duración (seg)",

                        data:
                            history.map(
                                h => h.durationSeconds
                            ),

                        backgroundColor: "#22c55e"
                    }
                ]
            }
        }
    );

}

function buildFlakyTests(history) {

    const flakyMap = {};

    history.forEach(run => {

        (run.failedTests || [])
            .forEach(test => {

                flakyMap[test.title] =
                    (
                        flakyMap[test.title] || 0
                    ) + 1;

            });

    });

    const flakyList =
        document.getElementById(
            "flakyTests"
        );

    flakyList.innerHTML = "";

    const ranking =
        Object.entries(flakyMap)
            .sort(
                (a, b) => b[1] - a[1]
            )
            .slice(0, 10);

    if (ranking.length === 0) {

        flakyList.innerHTML =
            "<li>✅ No se detectaron tests inestables</li>";

        return;

    }

    ranking.forEach(
        ([testName, occurrences]) => {

            flakyList.innerHTML += `
                <li>
                    ${testName}
                    <strong>(${occurrences})</strong>
                </li>
            `;

        }
    );

}

loadDashboard();