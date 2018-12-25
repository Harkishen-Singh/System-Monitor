"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemInfo_1 = require("../subprocesses/SystemInfo");
const checkcond = () => {
    const cond = document.getElementById("termscheck");
    const checkCondition = cond.checked;
    const button = document.getElementById("finish");
    if (checkCondition === true) {
        button.disabled = false;
    }
    else {
        button.disabled = true;
    }
};
const saveDetails = () => {
    const sd = new SystemInfo_1.SystemInfo();
    sd.extractDetails();
};
const finishEle = document.getElementById("finish");
finishEle.onclick = () => {
    saveDetails();
};
const check = document.getElementById("termscheck");
check.onclick = () => {
    checkcond();
};
