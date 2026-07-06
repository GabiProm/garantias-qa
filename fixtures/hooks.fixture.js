const {
    test: base,
    expect
} = require("@playwright/test");

const test = base;

test.beforeEach(async ({ }, testInfo) => {

    console.log(
        `\n🚀 INICIO: ${testInfo.title}`
    );

});

test.afterEach(async ({ }, testInfo) => {

    console.log(
        `✅ FIN: ${testInfo.title}`
    );

    console.log(
        `📌 ESTADO: ${testInfo.status}`
    );

    console.log(
        `🌐 NAVEGADOR: ${testInfo.project.name}`
    );

    console.log(
        `⏱ DURACIÓN: ${testInfo.duration} ms`
    );

    if (
        testInfo.status !==
        testInfo.expectedStatus
    ) {

        console.log(
            `❌ TEST FALLIDO: ${testInfo.title}`
        );

    }

});

module.exports = {
    test,
    expect
};