import { exec } from 'shelljs';

import JsonDB from "node-json-db";
 
const db = new JsonDB("myDataBase", true, false);

// var topExe = exec("top -b -n 1").code,
//             psExe = exec("ps -e").code;
// if (topExe) {
//     console.warn(topExe);

// }

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

    console.log(processObjects[5].Proto)
    // console.log(processObjects)