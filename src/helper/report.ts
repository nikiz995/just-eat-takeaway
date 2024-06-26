const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: " Automation Report",
    pageTitle: "Just eat Takeway report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "",
        },
        device: "Nikki - PC",
        platform: {
            name: "Windows",
            version: "11",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "Just Eat takeway" }
        ],
    },
});