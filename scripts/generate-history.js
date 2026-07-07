const fs = require("fs");
const path = require("path");

const historyPath =
    path.join(
        process.cwd(),
        "reports",
        "history"
    );

const files =
    fs.readdirSync(historyPath)
        .filter(
            file =>
                file.endsWith(".json")
        );

const history =
    files.map(file => {

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
            new Date(a.executionDate)
            -
            new Date(b.executionDate)
    );

fs.writeFileSync(

    path.join(
        process.cwd(),
        "qa-dashboard",
        "history.json"
    ),

    JSON.stringify(
        history,
        null,
        2
    )

);

console.log(
    "✅ history.json generado"
);