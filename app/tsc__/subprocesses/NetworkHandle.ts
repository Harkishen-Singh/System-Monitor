import { shell } from "electron";
import { exec, exit } from 'shelljs';

export class NetworkHandle {
    private networkCardsList: object[];
    private networkStatsList: object[];
    private networkSpeed:number;
    private networkSpeedListCollection: object[];
    private separator: string;

    constructor() {
    
        this.networkCardsList = [];
        this.separator = "%%%";
        this.networkStatsList = [];
        this.networkSpeed = 0;
        this.networkSpeedListCollection = [];
        
    }

    public netstatPID(pid : number) {
        const netstats = exec("netstat -tanp | grep "+ String(pid), { silent: true }).stdout.toString().split("\n");
        const processObjects = [];
        for (let j = 0 ; j < netstats.length-1; j++){ // first two being the headings
            const b = netstats[j].split(" ");
            const b_filtered:string[] = [];
            for (let x = 0 ; x < b.length ; x++) {
                if (!(b[x].trim()==="") && x !== (b.length-1)) {
                    b_filtered.push(b[x].trim());
                }
                else if (x===(b.length-1)) {
                    if (!b[x].startsWith("1")) {
                        b_filtered.push("%%%removethis%%%");
                    }
                    else {
                        b_filtered.push(b[x].trim());
                    }
                }
            }
            if(!(b_filtered[0] === "%%%removethis%%%")){
                processObjects.push({
                    "Proto": b_filtered[0],
                    "Recv-Q":b_filtered[1],
                    "Send-Q": b_filtered[2],
                    "LocalAddress": b_filtered[3],
                    "ForeignAddress": b_filtered[4],
                    "State" : b_filtered[5],
                    "PID/ProgramName": b_filtered[6]
                });
            }
        }
        this.networkCardsList = processObjects;
        return this.networkCardsList;
    }

    public netstatALL(){
        const proc = exec("netstat -tanp", { silent: true }).stdout.toString().split("\n");

        const headers = proc[1].trim().split(" ");
        // making list of it
        const headings: string[] = [];
        for (let n=0;n< headers.length; n++) {
            if (!(headers[n].trim() === "") && !(n===3 || n ===15 || n===32) && !(n===4 || n===16 || n===33)) {
                headings.push(headers[n].trim());
            }
            else if ((n===3|| n===15 || n === 32)) {
                headings.push(headers[n].trim()+" "+headers[n+1].trim());
            }
        }
        const processObjects: any[] = [];
        for (let j=2; j< proc.length-1; j++){ // first two being the headings
            let  b: string[] = [];
            b = proc[j].split(" ");
            const b_filtered: string[] = [];
            for (let x=0;x< b.length; x++) {
                if (!(b[x].trim() === "")) {
                    b_filtered.push(b[x].trim());
                }
            }
            processObjects.push({
                "Proto": b_filtered[0],
                "Recv-Q":b_filtered[1],
                "Send-Q": b_filtered[2],
                "LocalAddress": b_filtered[3],
                "ForeignAddress": b_filtered[4],
                "State" : b_filtered[5],
                "PID/ProgramName": b_filtered[6]
            });
        }
        this.networkStatsList = processObjects;
        return this.networkStatsList;
    }

    public networkActivityMonitoring(test: boolean = false) {
        let a : number;
        let b : number = 0;
        let len : number;
        let values : string[] = [];
        let ll : string[] = [];
        const processObjects: any[] = [];
        const child = exec('nethogs -t',{silent:true, async:true});
        const x : any = child.stdout;
        const self = this;
        x.on('data', (data:any) => {
            ll = data.split("\n");
            if(ll[1] === "Refreshing:"){
                for(let i=2;i<ll.length - 1; i++){
                    values = ll[i].split("\t");
                    len = processObjects.length
                    if(len === 0 ){
                        processObjects.push({
                            "Program": values[0],
                            "Sent":values[1],
                            "Recieved":values[2]
                        })
                    }
                    for(a = 0; a < len ; a++ ){
                        if(values[0] === processObjects[a].Program){
                            processObjects[a].Sent = values[1];
                            processObjects[a].Recieved = values[2];
                            if(a === len-1) {
                                b = a + 1;
                            }
                            else {
                                b = a;
                            }
                            break;
                        }
                    }
                    if(b === len-1){
                        processObjects.push({
                            "Program": values[0],
                            "Sent":values[1],
                            "Recieved":values[2]
                        })
                    }
                    if (test) {
                        setTimeout(() => {
                            console.warn("In testing timeouts! Breaking!");
                            exit(0);
                        }, 5000);
                    } else {
                        console.warn('Test Case Inactive');
                    }
                }
            }
            self.networkSpeedListCollection = processObjects;
        });
    }
}

