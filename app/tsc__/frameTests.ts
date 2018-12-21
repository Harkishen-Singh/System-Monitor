import { ProcessesHandle } from './subprocesses/ProcessHandle';
import {NetworkHandle} from './subprocesses/NetworkHandle';
export function runTests() {
    var obj: ProcessesHandle = new ProcessesHandle();
    var x = obj.getRunningProcesses();
    console.warn('Final')
    x.then((res: any) => {
        console.warn(res);
    });
}
// runTests();

export function netwotkTest(){
    var objNet : NetworkHandle = new NetworkHandle();
    console.log(objNet.netstatALL());
    console.log(objNet.netstatPID(1));
    console.log(objNet.networkActivityMonitoring());
}

netwotkTest();