"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var topExe = shelljs_1.exec("top -b -n 1", {silent: true}).stdout.toString(),
            psExe = shelljs_1.exec("ps -e", {silent: true}).stdout.toString();

console.warn(topExe.split('\n'))
