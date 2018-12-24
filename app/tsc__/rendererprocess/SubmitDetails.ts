import {SystemInfo} from '../subprocesses/SystemInfo'

var checkcond = () =>{
    let cond : boolean = (<HTMLInputElement>document.getElementById('termscheck')).checked;
    let button : any = (<HTMLInputElement>document.getElementById('finish'));
    if(cond == true){
        button.disabled = false;
    }
    else{
        button.disabled = true;
    }
} 

var saveDetails = () => {
    var sd : any = new SystemInfo();
    sd.extractDetails();
}

let finishEle : any = document.getElementById('finish');
finishEle.onclick = () =>{
    saveDetails()
}

let check : any = document.getElementById('termscheck');
check.onclick = () => {
    checkcond()
}