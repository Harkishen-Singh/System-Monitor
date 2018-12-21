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

    private filterProcesses(prs: string) {
        for (var i =0; i< prs.length; i++) {
            var one = prs[i].trim().split(" ");
            var pure: string[]= [], count: number=0;
            one.forEach((j: string) => {
                count++;
                try {
                    if (count==1 && i!=0) {
                        this.pidLists.push(parseInt(j.trim()));
                    } else if (count==2 && i==0) {
                        this.pidLists.push(1);
                    }
                } catch (e) {}
                var a = j.trim();
                if (!a.trim().length)
                    pure.push(a);
            });
            this.processCurrentTrimmed.push(pure);
        }
        this.getProcessDetails_catProc(this.pidLists);
    }


    public getAllCurrentProcesses() {
        // get all running process in batch mode in single iteration
        var procSys = new ProcessBuilder("top", "-b" ,"-n", "1");
        ProcessBuilder procMain = new ProcessBuilder("ps", "-e");
        Process proc = procMain.start();
        BufferedReader br = new BufferedReader(new InputStreamReader(proc.getInputStream()));

        this.processLine = br.readLine();
        try {
            while (true) {
                this.processLine = br.readLine();
                if (this.processLine.trim().equals("")) {
                    break;
                }
                this.processLineAll += this.processLine + this.separator;
            }
        } catch (NullPointerException e) {
            System.out.println("Finished scanning");
        }
        this.processCurrentArray = this.processLineAll.split(separator);
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

    public List<Map<var, var>> getProcessDetails_catProc(List<Integer> ps) {
        BufferedReader Br;
        for (int pid: ps) {
            ProcessBuilder prr = new ProcessBuilder("cat", "/proc/"+var.valueOf(pid)+"/status");
            Process prrRun = prr.start();
            Br = new BufferedReader(new InputStreamReader(prrRun.getInputStream()));
            try {
                while (true) {
                    this.processLine = Br.readLine();
                    if (this.processLine.trim().equals("")) {
                        break;
                    }
                    this.processDetailsAll += this.processLine.replaceAll(",", "|") + this.separator;

                }
            } catch (Exception e) {;}
            this.processDetailsArray = this.processDetailsAll.split(this.separator);
            this.processDetailsArrayAll.add(this.processDetailsArray);
            this.processDetailsArrayAllvarified.add(Arrays.tovar(this.processDetailsArray));
            this.processDetailsAll = "";
            this.psDetailMap.add(this.detailsToMaps(this.processDetailsArray));
        }
        return this.psDetailMap;
    }

    private Map<var,var> detailsToMaps(var[] d) {
        Map<var, var> processDetails = new LinkedHashMap<var, var>();
        for (var x: d) {
            x.replaceAll(":", "%%%");
            try {
                processDetails.put(x.split(":")[0], x.split(":")[1].trim());
            } catch (ArrayIndexOutOfBoundsException e) {
                processDetails.put(x.split(":")[0], "");
            }
        }
        return processDetails;

    }

    public displayAllFunctionalities() {
        System.out.println("display function");
        System.out.println(this.psDetailMap);
    }

    public runFunctionalities() {
        this.getAllCurrentProcesses();
    }

    public runTests() {
        this.getAllCurrentProcesses();
        return true;
    }
}
