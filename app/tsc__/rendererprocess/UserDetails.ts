import {DBService} from "../dbService";

function storeData(){
    const username: any = document.getElementById("username") as HTMLElement;
    const usernameV: any = username.value;
    const email: any = document.getElementById("email") as HTMLElement;
    const emailV: any = email.value;
    let bool: boolean = false;
    const obj = {
        EmailId: emailV,
        Username: usernameV,
    };

    if ( usernameV === "" || emailV === "" ) {
        bool = false;
        return bool;
    } else {
        bool = true;
        const file = new DBService("../store/SystemInfoFile");
        file.saveObject("/UserDetails", obj);
        return bool;
    }
}

const nextEle: any = document.getElementById("next");

nextEle.onclick = () => {

    const flag = storeData();

    if ( flag === true ) {
        window.location.href = "./AboutSoft.html";
    } else {
       document.getElementById("error").innerHTML = "Please Fill all the details";
    }
}

