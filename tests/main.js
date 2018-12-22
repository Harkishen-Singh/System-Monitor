const ProcessHandleTest = require('./processhandle');
const NetworkHandleTests = require('./networkhandle');

function main() {
    ProcessHandleTest.ProcessHandleTest();
    NetworkHandleTests.NetworkHandleTests(); // always keep in last due to exit(0)
}

main();