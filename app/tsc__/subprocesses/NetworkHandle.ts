import { exec } from 'shelljs';
import { shell } from "electron";

export class NetworkHandle {
    private networkCardsList: string[];
    private networkStatsList: string[];
    private networkSpeed:number;
    private networkSpeedListCollection: object[];
    private separator: string;

    NetworkHandle() {
        this.networkCardsList = [];
        this.separator = "%%%";
        this.networkCardsList = [];
        this.networkStatsList = [];
        this.networkSpeed = 0;
        this.networkSpeedListCollection = [];
    }

    public netstatPID(pid: string){
        Process netstats = Runtime.getRuntime().exec("netstat -tanp | grep "+(pid));
        Scanner SS = new Scanner(netstats.getInputStream());
        String line="", sentence="";
        Boolean exit=false;
        while (true) {
            try {
                line = SS.nextLine();
                if (line == null)
                    break;
                sentence += line + this.separator;
            } catch (Exception e) {
                exit=true;
            } if (exit)
                break;
        }
        String[] aa = sentence.split(this.separator);
        String[] headers = aa[1].split(" ");
        // making list of it
        List<String> headings = new ArrayList<String>();
        for (int n=0;n< headers.length; n++) {
            if (!headers[n].trim().equals("") && !(n==3 || n ==15 || n==32) && !(n==4 || n==16 || n==33))
                headings.add(headers[n].trim());
            else if ((n==3|| n==15 || n == 32))
                headings.add(headers[n].trim()+" "+headers[n+1].trim());
        }
        List<Object> processObjects = new ArrayList<Object>();
        for (int j=2; j< aa.length; j++){ // first two being the headings
            Map<String, String> abc = new LinkedHashMap<String, String>();
            String[] b = aa[j].split(" ");
            // filter empty cells from b
            List<String> b_filtered = new ArrayList<String>();
            int count = 0;
            for (int x=0;x< b.length; x++) {
                if (!b[x].trim().equals("") && x!=(b.length-1))
                    b_filtered.add(b[x].trim());
                else if (x==(b.length-1))
                    if (!b[x].startsWith(pid))
                        b_filtered.add("%%%removethis%%%");
                    else
                        b_filtered.add(b[x].trim());
            }
            if (b_filtered.size()==headings.size())
                for (int k = 0; k < b_filtered.size(); k++)
                    abc.put(headings.get(k).trim(), b_filtered.get(k).trim());
            else
                System.err.println("Size incompatible");
            if (!(abc.get("PID/Program name")=="%%%removethis%%%"))
                processObjects.add(abc);
        }
        return processObjects;
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
        var processObjects = [];
        for (var j=2; j< proc.length; j++){ // first two being the headings
            var  b: string[] = [];
            b = proc[j].split(" ");
            var b_filtered: string[] = [];
            var count: number = 0;
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
        return processObjects;
    }

    public void networkActivityMonitoring() throws IOException{
        final Process pcc = Runtime.getRuntime().exec("nethogs -t");
        BufferedReader br = new BufferedReader(new InputStreamReader(pcc.getInputStream()));
        String ll = "", sentence="", next="";
        String headers[] = {"Program", "Sent", "Received"};
        ll = br.readLine();
        List<Object> processObjects = new ArrayList<Object>();

        if(ll == null){
            System.out.println("No internet Connection");
        }
        else{
            while(true){
                ll = br.readLine();
                if(ll.equals("Refreshing:")) {
                    processObjects.clear();
                    while(true){
                        ll = br.readLine();
                        if(ll.equals("")) {
                            break;
                        }
                        sentence = ll;
                        String[] process_details = sentence.split("\t");
                        Map<String, String> line = new LinkedHashMap<String, String>();
                        if (process_details.length == 3) {

                            for (int k = 0; k < 3; k++)
                                line.put(headers[k].trim(), process_details[k].trim());
                        }
//                        System.out.println(line);
                        processObjects.add(line);
                    }
                    System.out.println(processObjects);
                }
            }
        }
    }

    public boolean runTests() throws IOException {
        System.out.println(new NetworkHandle().netstatALL());
        System.out.println(new NetworkHandle().netstatPID("1"));
        return true;
    }

//    public static void main(String[] args) throws IOException {
//        System.out.println(new NetworkHandle().netstatALL());
//        NetworkHandle obj = new NetworkHandle();
//         obj.networkActivityMonitoring();
//    }
}
