"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var ProcessesHandle = /** @class */ (function () {
    function ProcessesHandle() {
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
    ProcessesHandle.prototype.filterProcesses = function (prs) {
        var _this = this;
        for (var i = 0; i < prs.length; i++) {
            var one = prs[i].trim().split(" ");
            var pure = [], count = 0;
            one.forEach(function (j) {
                count++;
                try {
                    if (count == 1 && i != 0) {
                        _this.pidLists.push(parseInt(j.trim()));
                    }
                    else if (count == 2 && i == 0) {
                        _this.pidLists.push(1);
                    }
                }
                catch (e) { }
                var a = j.trim();
                if (!a.trim().length)
                    pure.push(a);
            });
            this.processCurrentTrimmed.push(pure);
        }
        this.getProcessDetails_catProc(this.pidLists);
    };
    ProcessesHandle.prototype.getAllCurrentProcesses = function () {
        // get all running process in batch mode in single iteration
        var topExe = shelljs_1.exec("top -b -n 1", { silent: true }).stdout.toString().split("\n"), psExe = shelljs_1.exec("ps -e", { silent: true }).stdout.toString().split("\n");
        if (!topExe && !psExe)
            shelljs_1.exit(1);
        this.processCurrentArray = topExe;
        this.filterProcesses(this.processCurrentArray);
    };
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
    ProcessesHandle.prototype.getProcessDetails_catProc = function (ps) {
        var _this = this;
        ps.forEach(function (pid) {
            var currentProcess = shelljs_1.exec("cat" + "/proc/" + String(pid) + "/status", { silent: true }).stdout.toString().split("\n");
            currentProcess.forEach(function (pp) {
                pp.replace(/,/g, "|");
                _this.processDetailsArrayAll.push(pp);
            });
            _this.processDetailsArray = _this.processDetailsAll.split(_this.separator);
            _this.processDetailsArrayAll.push(_this.processDetailsArray);
            _this.processDetailsAll = "";
            _this.psDetailMap.push(_this.detailsToMaps(currentProcess));
        });
        return this.psDetailMap;
    };
    ProcessesHandle.prototype.detailsToMaps = function (d) {
        var processDetails = {};
        d.forEach(function (x) {
            x.replace(/:/g, "%%%");
            try {
                processDetails[x.split(":")[0]] = x.split(":")[1].trim();
            }
            catch (e) {
                processDetails[x.split(":")[0]] = "";
            }
        });
        return processDetails;
    };
    ProcessesHandle.prototype.displayAllFunctionalities = function () {
        console.log("display function");
        console.log(this.psDetailMap);
    };
    ProcessesHandle.prototype.runFunctionalities = function () {
        this.getAllCurrentProcesses();
    };
    ProcessesHandle.prototype.runTests = function () {
        this.getAllCurrentProcesses();
        return true;
    };
    return ProcessesHandle;
}());
exports.ProcessesHandle = ProcessesHandle;
