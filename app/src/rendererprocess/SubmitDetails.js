"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemInfo_1 = require("../subprocesses/SystemInfo");
var checkcond = () => {
    let cond = document.getElementById('termscheck').checked;
    let button = document.getElementById('finish');
    if (cond == true) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
};
var saveDetails = () => {
    var sd = new SystemInfo_1.SystemInfo();
    sd.extractDetails();
};
let finishEle = document.getElementById('finish');
finishEle.onclick = () => {
    saveDetails();
};
let check = document.getElementById('termscheck');
check.onclick = () => {
    checkcond();
};
