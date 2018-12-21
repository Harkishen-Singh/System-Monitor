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
var proc = shelljs_1.exec("netstat -tanp").code;
if (proc) {
    console.warn(proc);
}
db.push("/test1", proc);
db.getData("/");
