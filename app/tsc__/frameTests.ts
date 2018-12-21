import { ProcessesHandle } from './subprocesses/ProcessHandle';
export function runTests() {
    var obj: ProcessesHandle = new ProcessesHandle();
    var x = obj.getRunningProcesses();
    console.warn('Final')
    x.then((res: any) => {
        console.warn(res);
    });
}

runTests();