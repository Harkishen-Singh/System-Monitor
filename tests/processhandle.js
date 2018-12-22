const ProcessesHandle = require('../app/src/subprocesses/ProcessHandle');

function ProcessHandleTest() {
    console.warn("\nExecuting ProcessHandle tests..\n");
    var obj = new ProcessesHandle.ProcessesHandle();
    var x = obj.getRunningProcesses();
    console.warn('Final')
    x.then((res) => {
        console.warn(res);
        console.warn("\nProcessHandle test Completed!\n");
    });
}

exports.ProcessHandleTest = ProcessHandleTest;