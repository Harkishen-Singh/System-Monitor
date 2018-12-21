import { exec, cp, exit, cat } from 'shelljs';
import { resolve } from 'url';

export class ProcessesHandle {

    private processLine: string;
    private processLineAll: string;
    private separator: string;
    public processCurrentArray: string[];
    public processCurrentTrimmed: string[][];
    public pidLists: number[];
    public processDetailsArray: string[];
    public processDetailsArrayAll: any[];
    private processDetailsAll: string;
    public processDetailsArrayAllvarified: any[];
    public psDetailMap: object[];

    constructor() {
        console.log('working')
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

    private filterProcesses(prs: string[]) {
        for (var i =0; i< prs.length; i++) {
            var one = prs[i].trim().split(" ");
            var pure: string[]= [], count: number=0;
            one.forEach((j: string) => {
                if (j.length) {
                    count++;
                // try {
                    if (count==1 && i!=0) {
                        this.pidLists.push(parseInt(j));
                        pure.push(j);
                    } else if (count==2 && i==0) {
                        this.pidLists.push(1);
                    }
                // } catch (e) {}
                }
            });
            this.processCurrentTrimmed.push(pure);
        }
        this.getProcessDetails_catProc(this.pidLists);
    }

    public startScanCurrentProcesses() {
        // get all running process in batch mode in single iteration
        var topExe = exec("top -b -n 1", {silent: true}).stdout.toString().split("\n"),
            psExe = exec("ps -e", {silent: true}).stdout.toString().split("\n");
        if (!topExe && !psExe)
            exit(1);
        this.processCurrentArray = topExe;
        for(let p = 0; p< this.processCurrentArray.length; p++) {
            let temp: string[] = [];
            let onePro: string[] = this.processCurrentArray[p].split(' ');
            for(let tt =0; tt< onePro.length; tt++) {
                if (onePro[tt].length)
                    temp.push(onePro[tt])
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
     * */

    public getProcessDetails_catProc(ps: number[]) {
        let count = 0;
        ps.forEach( (pid: number) => {
            count++;
            let objectTh: any = {};
            var currentProcess = exec("cat " + "/proc/"+(pid)+"/status", { silent: true }).stdout.toString().split("\n");
            currentProcess.forEach( pp => {
                try {
                    let pros = pp.split(":")
                    let keyTh: any = pros[0];
                    let value: any = pros[1].substr(2);
                    objectTh[keyTh] = value;
                } catch(e) {}
            })
            this.processDetailsAll = "";
            this.processDetailsArrayAll.push(objectTh);
            console.warn('count: '+count)
        });
        return this.processDetailsArrayAll;
    }

    public getRunningProcesses() {
        this.startScanCurrentProcesses();
        return new Promise((resolve: any, reject: any) => {
            resolve({
                result: this.processDetailsArrayAll,
                state: 'valid'
            });
            setTimeout(() => {
                if (!this.processDetailsArrayAll)
                    reject({
                        result: null,
                        state: 'timeout'
                    });
            });
        });
    }

    private detailsToMaps(d: string[]) {
        let processDetails: any = {};
        d.forEach( (x: string)=> {
            x.replace(/:/g, "%%%");
            try {
                processDetails[x.split(":")[0]] = x.split(":")[1].trim();
            } catch (e) {
                processDetails[x.split(":")[0]] = "";
            }
        });
        return processDetails;

    }

    public displayAllFunctionalities() {
        console.log("display function");
        console.log(this.psDetailMap);
    }

    public runFunctionalities() {
        this.getRunningProcesses();
    }

    public runTests() {
        this.startScanCurrentProcesses();
        return true;
    }
}
