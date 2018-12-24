import {DBService} from '../dbService';
const electron = require('electron')

function storeData(){
    let username : any = (<HTMLInputElement>document.getElementById('username')).value;
    let email : any = (<HTMLInputElement>document.getElementById('email')).value;    
    
    let bool : boolean = false;
    let obj = {
        Username : username,
        EmailId : email
    };

    if(username == "" || email == ""){
        bool = false;
        return bool;
    }
    else{
        bool = true;
        const file = new DBService('../store/SystemInfoFile')
        file.saveObject('/UserDetails', obj)
        return bool;
    }
}

let nextEle : any = document.getElementById('next');

nextEle.onclick = () => {
    var x = storeData();
    
    if( x === true){
        window.location.href = "./AboutSoft.html";
    }

    else{
       document.getElementById('error').innerHTML = "Please Fill all the details";
    }
}

