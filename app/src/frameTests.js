"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessHandle_1 = require("./subprocesses/ProcessHandle");
const NetworkHandle_1 = require("./subprocesses/NetworkHandle");
function runTests() {
    var obj = new ProcessHandle_1.ProcessesHandle();
    var x = obj.getRunningProcesses();
    console.warn('Final');
    x.then((res) => {
        console.warn(res);
    });
}
exports.runTests = runTests;
// runTests();
function netwotkTest() {
    var objNet = new NetworkHandle_1.NetworkHandle();
    console.log(objNet.netstatALL());
    console.log(objNet.netstatPID(1));
    console.log(objNet.networkActivityMonitoring());
}
exports.netwotkTest = netwotkTest;
netwotkTest();
