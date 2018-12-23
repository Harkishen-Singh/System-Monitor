"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NetworkHandle_1 = require("./subprocesses/NetworkHandle");
const ProcessHandle_1 = require("./subprocesses/ProcessHandle");
function runTests() {
    const obj = new ProcessHandle_1.ProcessesHandle();
    const x = obj.getRunningProcesses();
    console.warn('Final');
    x.then((res) => {
        console.warn(res);
    });
}
exports.runTests = runTests;
// runTests();
function netwotkTest() {
    const objNet = new NetworkHandle_1.NetworkHandle();
    console.log(objNet.netstatALL());
    console.log(objNet.netstatPID(1));
    console.log(objNet.networkActivityMonitoring());
}
exports.netwotkTest = netwotkTest;
netwotkTest();
