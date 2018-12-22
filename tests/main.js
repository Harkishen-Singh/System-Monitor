const ProcessHandleTest = require('./processhandle');
const NetworkHandleTests = require('./networkhandle');
const DatabaseServiceTest = require('./databaseTest');

function main() {
    ProcessHandleTest.ProcessHandleTest();
    DatabaseServiceTest.DatabaseServiceTest();
    NetworkHandleTests.NetworkHandleTests(); // always keep in last due to exit(0)
}

main();