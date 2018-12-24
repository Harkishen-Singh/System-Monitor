"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbService_1 = require("../dbService");
const electron = require('electron');
const ipc = electron.ipcRenderer;
function storeData() {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let bool = false;
    let obj = {
        Username: username,
        EmailId: email
    };
    if (username == "" || email == "") {
        bool = false;
        return bool;
    }
    else {
        bool = true;
        const file = new dbService_1.DBService('../store/SystemInfoFile');
        file.saveObject('/UserDetails', obj);
        console.log(file.getStore('/UserDetails'));
        alert("sdf");
        return bool;
    }
}
let nextEle = document.getElementById('next');
nextEle.onclick = () => {
    var x = storeData();
    if (x === true) {
        window.location.href = './AboutSoft.html';
    }
    else {
        document.getElementById('error').innerHTML = "Please Fill all the details";
    }
};
