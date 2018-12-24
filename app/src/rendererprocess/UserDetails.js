"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbService_1 = require("../dbService");
function storeData() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    let bool = false;
    const obj = {
        Username: username,
        EmailId: email
    };
    if (username === "" || email === "") {
        bool = false;
        return bool;
    }
    else {
        bool = true;
        const file = new dbService_1.DBService('../store/SystemInfoFile');
        file.saveObject('/UserDetails', obj);
        return bool;
    }
}
const nextEle = document.getElementById('next');
nextEle.onclick = () => {
    const flag = storeData();
    if (flag === true) {
        window.location.href = "./AboutSoft.html";
    }
    else {
        document.getElementById('error').innerHTML = "Please Fill all the details";
    }
};
