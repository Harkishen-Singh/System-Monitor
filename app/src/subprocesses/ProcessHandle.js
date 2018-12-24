"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
class ProcessesHandle {
    constructor() {
        console.log('working');
        this.separator = "%%%";
        this.processCurrentTrimmed = [];
        this.pidLists = [];
        this.processDetailsArrayAll = [];
        this.processDetailsArrayAllvarified = [];
        this.psDetailMap = [];
        this.processDetailsAll = "";
        this.processDetailsArray = [];
        this.processCurrentArray = [];
        this.processLine = "";
        this.processLineAll = "";
    }
    startScanCurrentProcesses() {
        // get all running process in batch mode in single iteration
        const topExe = shelljs_1.exec("top -b -n 1", { silent: true }).stdout.toString().split("\n");
        const psExe = shelljs_1.exec("ps -e", { silent: true }).stdout.toString().split("\n");
        if (!topExe && !psExe) {
            shelljs_1.exit(1);
        }
        this.processCurrentArray = topExe;
        for (let p = 0; p < this.processCurrentArray.length; p++) {
            const temp = [];
            const onePro = this.processCurrentArray[p].split(' ');
            for (let tt = 0; tt < onePro.length; tt++) {
                if (onePro[tt].length) {
                    temp.push(onePro[tt]);
                }
            }
            this.processCurrentArray[p] = temp.join(",");
        }
        this.filterProcesses(this.processCurrentArray);
    }
    /**
     * USE CASE EXAMPLE ( PID 13021 -> JAVA )
     * Name:   java
     * Umask:  0002
     * State:  S (sleeping)
     * Tgid:   13021
     * Ngid:   0
     * Pid:    13021
     * PPid:   3638
     * TracerPid:      0
     * Uid:    1000    1000    1000    1000
     * Gid:    1000    1000    1000    1000
     * FDSize: 512
     * Groups: 10 1000
     * NStgid: 13021
     * NSpid:  13021
     * NSpgid: 1636
     * NSsid:  1636
     * VmPeak:  4266236 kB
     * VmSize:  4266236 kB
     * VmLck:         0 kB
     * VmPin:         0 kB
     * VmHWM:    152952 kB
     * VmRSS:    151852 kB
     * RssAnon:          132448 kB
     * RssFile:           19364 kB
     * RssShmem:             40 kB
     * VmData:   354916 kB
     * VmStk:       140 kB
     * VmExe:         4 kB
     * VmLib:     22492 kB
     * VmPTE:       696 kB
     * VmSwap:        0 kB
     * HugetlbPages:          0 kB
     * CoreDumping:    0
     * Threads:        23
     * SigQ:   1/47404
     * SigPnd: 0000000000000000
     * ShdPnd: 0000000000000000
     * SigBlk: 0000000000000004
     * SigIgn: 0000000000000000
     * SigCgt: 2000000181005ccf
     * CapInh: 0000000000000000
     * CapPrm: 0000000000000000
     * CapEff: 0000000000000000
     * CapBnd: 0000003fffffffff
     * CapAmb: 0000000000000000
     * NoNewPrivs:     0
     * Seccomp:        0
     * Speculation_Store_Bypass:       thread vulnerable
     * Cpus_allowed:   ff
     * Cpus_allowed_list:      0-7
     * Mems_allowed:   00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000001
     * Mems_allowed_list:      0
     * voluntary_ctxt_switches:        1
     * nonvoluntary_ctxt_switches:     0
     */
    getProcessDetails_catProc(ps) {
        let count = 0;
        ps.forEach((pid) => {
            count++;
            const objectTh = {};
            const currentProcess = shelljs_1.exec("cat " + "/proc/" + (pid) + "/status", { silent: true }).stdout.toString().split("\n");
            currentProcess.forEach(pp => {
                try {
                    const pros = pp.split(":");
                    const keyTh = pros[0];
                    const value = pros[1].substr(2);
                    objectTh[keyTh] = value;
                }
                catch (e) {
                    ;
                }
            });
            this.processDetailsAll = "";
            this.processDetailsArrayAll.push(objectTh);
            console.warn('count: ' + count);
        });
        return this.processDetailsArrayAll;
    }
    getRunningProcesses() {
        this.startScanCurrentProcesses();
        const ProcessPromise = new Promise((resolvePro, reject) => {
            resolvePro({
                result: this.processDetailsArrayAll,
                state: 'valid'
            });
            setTimeout(() => {
                if (!this.processDetailsArrayAll) {
                    reject({
                        result: null,
                        state: 'timeout'
                    });
                }
            });
        });
        return ProcessPromise;
    }
    displayAllFunctionalities() {
        console.log("display function");
        console.log(this.psDetailMap);
    }
    runFunctionalities() {
        this.getRunningProcesses();
    }
    runTests() {
        this.startScanCurrentProcesses();
        return true;
    }
    filterProcesses(prs) {
        for (let i = 0; i < prs.length; i++) {
            const one = prs[i].trim().split(" ");
            const pure = [];
            let count = 0;
            one.forEach((j) => {
                if (j.length) {
                    count++;
                    // try {
                    if (count === 1 && i !== 0) {
                        this.pidLists.push(parseInt(j, 10));
                        pure.push(j);
                    }
                    else if (count === 2 && i === 0) {
                        this.pidLists.push(1);
                    }
                    // } catch (e) {}
                }
            });
            this.processCurrentTrimmed.push(pure);
        }
        this.getProcessDetails_catProc(this.pidLists);
    }
    detailsToMaps(d) {
        const processDetails = {};
        d.forEach((x) => {
            x.replace(/:/g, "%%%");
            try {
                processDetails[x.split(":")[0]] = x.split(":")[1].trim();
            }
            catch (e) {
                processDetails[x.split(":")[0]] = "";
            }
        });
        return processDetails;
    }
}
exports.ProcessesHandle = ProcessesHandle;
