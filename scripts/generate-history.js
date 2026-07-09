const fs = require("fs");
const path = require("path");

const reportsPath =
    path.join(
        process.cwd(),
        "reports"
    );

const historyPath =
    path.join(
        reportsPath,
        "history"
    );

const dashboardPath =
    path.join(
        process.cwd(),
        "qa-dashboard"
    );

const dashboardHistoryFile =
    path.join(
        dashboardPath,
        "history.json"
    );

if (!fs.existsSync(dashboardPath)) {

    fs.mkdirSync(
        dashboardPath,
        {
            recursive: true
        }
    );

}

if (!fs.existsSync(historyPath)) {

    console.log(
        "⚠ reports/history no existe. Se generará history.json vacío."
    );

    fs.writeFileSync(
        dashboardHistoryFile,
        JSON.stringify(
            [],
            null,
            2
        )
    );

    console.log(
        "✅ history.json vacío generado correctamente"
    );

    process.exit(0);

}

const files =
    fs.readdirSync(historyPath)
        .filter(file =>
            file.endsWith(".json")
        );

if (files.length === 0) {

    console.log(
        "⚠ No existen archivos JSON en reports/history. Se generará history.json vacío."
    );

    fs.writeFileSync(
        dashboardHistoryFile,
        JSON.stringify(
            [],
            null,
            2
        )
    );

    console.log(
        "✅ history.json vacío generado correctamente"
    );

    process.exit(0);

}

const history =
    files
        .map(file => {

            const content =
                fs.readFileSync(
                    path.join(
                        historyPath,
                        file
                    ),
                    "utf8"
                );

            return JSON.parse(content);

        })
        .sort(
            (a, b) =>
                new Date(a.executionDate) -
                new Date(b.executionDate)
        );

fs.writeFileSync(
    dashboardHistoryFile,
    JSON.stringify(
        history,
        null,
        2
    )
);

console.log(
    "✅ history.json generado correctamente"
);