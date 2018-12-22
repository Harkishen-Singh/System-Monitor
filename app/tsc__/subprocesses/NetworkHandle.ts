import { exec, exit } from 'shelljs';
import { shell } from "electron";

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
        var netstats = exec("netstat -tanp | grep "+ String(pid), { silent: true }).stdout.toString().split("\n");
        var processObjects = [];
        for (var j = 0 ; j < netstats.length-1; j++){ // first two being the headings
            var b = netstats[j].split(" ");
            var b_filtered:string[] = [];
            var count = 0;
            for (var x = 0 ; x < b.length ; x++) {
                if (!(b[x].trim()=="") && x != (b.length-1))
                    b_filtered.push(b[x].trim());
                else if (x==(b.length-1))
                    if (!b[x].startsWith("1"))
                        b_filtered.push("%%%removethis%%%");
                    else
                        b_filtered.push(b[x].trim());
            }
            if(!(b_filtered[0] == "%%%removethis%%%")){
                processObjects.push({
                    "Proto": b_filtered[0],
                    "Recv-Q":b_filtered[1],
                    "Send-Q": b_filtered[2],
                    "Local Address": b_filtered[3],
                    "Foreign Address": b_filtered[4],
                    "State" : b_filtered[5],
                    "PID/Program name": b_filtered[6]
                });
            }
        }
        this.networkCardsList = processObjects;
        return this.networkCardsList;
    }

    public netstatALL(){
        var proc = exec("netstat -tanp", { silent: true }).stdout.toString().split("\n");

        var headers = proc[1].trim().split(" ");
        // making list of it
        var headings: string[] = [];
        for (var n=0;n< headers.length; n++) {
            if (!(headers[n].trim() === "") && !(n==3 || n ==15 || n==32) && !(n==4 || n==16 || n==33))
                headings.push(headers[n].trim());
            else if ((n==3|| n==15 || n == 32))
                headings.push(headers[n].trim()+" "+headers[n+1].trim());
        }
        var processObjects:any[] = [];
        var processObjects1:any[] =[];
        for (var j=2; j< proc.length-1; j++){ // first two being the headings
            var  b: string[] = [];
            b = proc[j].split(" ");
            var b_filtered: string[] = [];
            for (var x=0;x< b.length; x++) {
                if (!(b[x].trim() === ""))
                    b_filtered.push(b[x].trim());
            }
            processObjects.push({
                "Proto": b_filtered[0],
                "Recv-Q":b_filtered[1],
                "Send-Q": b_filtered[2],
                "Local Address": b_filtered[3],
                "Foreign Address": b_filtered[4],
                "State" : b_filtered[5],
                "PID/Program name": b_filtered[6]
            });
        }
        this.networkStatsList = processObjects;
        return this.networkStatsList;
    }

    public networkActivityMonitoring(test: boolean = false) {
        var i : number,
            a : number,
            b : number = 0,
            len : number;
        var values : string[] = [];
        var ll : string[] = [];
        var processObjects: any[] = [];
        var child = exec('nethogs -t',{silent:true, async:true});
        var x : any = child.stdout;
        var self = this;
        x.on('data', function(data:any) {
            ll = data.split("\n");
            if(ll[1] == "Refreshing:"){
                for(i=2;i<ll.length - 1; i++){
                    values = ll[i].split("\t");
                    len = processObjects.length
                    if(len == 0 ){
                        processObjects.push({
                            "Program": values[0],
                            "Sent":values[1],
                            "Recieved":values[2]
                        })
                    }
                    for(a = 0; a < len ; a++ ){
                        if(values[0] == processObjects[a].Program){
                            processObjects[a].Sent = values[1];
                            processObjects[a].Recieved = values[2];
                            if(a == len-1)
                                b = a + 1;
                            else
                                b = a;
                            break;
                        }
                    }
                    if(b == len-1){
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
            console.log(self.networkSpeedListCollection)
        });
        // return this.networkSpeedListCollection;
    }
}

var a = new NetworkHandle();
a.networkActivityMonitoring();
