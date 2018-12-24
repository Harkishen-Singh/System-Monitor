import {DBService} from '../dbService';

function storeData(){
    const username : any = (<HTMLInputElement>document.getElementById('username')).value;
    const email : any = (<HTMLInputElement>document.getElementById('email')).value;    
    
    let bool : boolean = false;
    const obj = {
        Username : username,
        EmailId : email
    };

    if(username === "" || email === ""){
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

const nextEle : any = document.getElementById('next');

nextEle.onclick = () => {
    const flag = storeData();

    if( flag === true){
        window.location.href = "./AboutSoft.html";
    }

    else{
       document.getElementById('error').innerHTML = "Please Fill all the details";
    }
}

