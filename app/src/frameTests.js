"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessHandle_1 = require("./subprocesses/ProcessHandle");
function runTests() {
    var obj = new ProcessHandle_1.ProcessesHandle();
    var x = obj.getRunningProcesses();
    console.warn('Final');
    x.then((res) => {
        console.warn(res);
    });
}
exports.runTests = runTests;
runTests();
