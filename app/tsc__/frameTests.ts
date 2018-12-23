import { NetworkHandle } from './subprocesses/NetworkHandle';
import { ProcessesHandle } from './subprocesses/ProcessHandle';

export function runTests() {
    const obj: ProcessesHandle = new ProcessesHandle();
    const x = obj.getRunningProcesses();
    console.warn('Final')
    x.then((res: any) => {
        console.warn(res);
    });
}
// runTests();

export function netwotkTest(){
    const objNet : NetworkHandle = new NetworkHandle();
    console.log(objNet.netstatALL());
    console.log(objNet.netstatPID(1));
    console.log(objNet.networkActivityMonitoring());
}

netwotkTest();