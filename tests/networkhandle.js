const NetworkHandle = require('../app/src/subprocesses/NetworkHandle');

function NetworkHandleTests() {
    console.warn("\nExecuting NetworkHandle tests..\n");
    var objNet = new NetworkHandle.NetworkHandle();
    console.log(objNet.netstatALL());
    console.log(objNet.netstatPID(1));
    console.log(objNet.networkActivityMonitoring(true));
    console.warn("\nNetworkHandle test Completed!\n");
}

exports.NetworkHandleTests = NetworkHandleTests;