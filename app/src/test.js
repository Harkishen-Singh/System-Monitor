"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var node_json_db_1 = __importDefault(require("node-json-db"));
var db = new node_json_db_1.default("myDataBase", true, false);
// var topExe = exec("top -b -n 1").code,
//             psExe = exec("ps -e").code;
// if (topExe) {
//     console.warn(topExe);
// }
var proc = shelljs_1.exec("netstat -tanp", { silent: true }).stdout.toString().split("\n");
var headers = proc[1].trim().split(" ");
// making list of it
var headings = [];
for (var n = 0; n < headers.length; n++) {
    if (!(headers[n].trim() === "") && !(n == 3 || n == 15 || n == 32) && !(n == 4 || n == 16 || n == 33))
        headings.push(headers[n].trim());
    else if ((n == 3 || n == 15 || n == 32))
        headings.push(headers[n].trim() + " " + headers[n + 1].trim());
}
var processObjects = [];
for (var j = 2; j < proc.length; j++) { // first two being the headings
    var b = [];
    b = proc[j].split(" ");
    var b_filtered = [];
    var count = 0;
    for (var x = 0; x < b.length; x++) {
        if (!(b[x].trim() === ""))
            b_filtered.push(b[x].trim());
    }
    processObjects.push({
        "Proto": b_filtered[0],
        "Recv-Q": b_filtered[1],
        "Send-Q": b_filtered[2],
        "Local Address": b_filtered[3],
        "Foreign Address": b_filtered[4],
        "State": b_filtered[5],
        "PID/Program name": b_filtered[6]
    });
}
console.log(processObjects[5].Proto);
// console.log(processObjects)
