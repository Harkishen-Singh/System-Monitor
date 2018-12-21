import { exec } from 'shelljs';

import JsonDB from "node-json-db";
 
const db = new JsonDB("myDataBase", true, false);

// var topExe = exec("top -b -n 1").code,
//             psExe = exec("ps -e").code;
// if (topExe) {
//     console.warn(topExe);

// }

var proc = exec("netstat -tanp").code;
if(proc){
    console.warn(proc)
}

db.push("/test1", proc)

db.getData("/")