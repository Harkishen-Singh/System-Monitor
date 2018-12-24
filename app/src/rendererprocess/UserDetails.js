"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbService_1 = require("../dbService");
function storeData() {
    const username = document.getElementById("username");
    const usernameV = username.value;
    const email = document.getElementById("email");
    const emailV = email.value;
    let bool = false;
    const obj = {
        EmailId: emailV,
        Username: usernameV,
    };
    if (usernameV === "" || emailV === "") {
        bool = false;
        return bool;
    }
    else {
        bool = true;
        const file = new dbService_1.DBService("./app/src/store/SystemInfoFile");
        file.saveObject("/UserDetails", obj);
        return bool;
    }
}
const nextEle = document.getElementById("next");
nextEle.onclick = () => {
    const flag = storeData();
    if (flag === true) {
        window.location.href = "./AboutSoft.html";
    }
    else {
        document.getElementById("error").innerHTML = "Please Fill all the details";
    }
};
