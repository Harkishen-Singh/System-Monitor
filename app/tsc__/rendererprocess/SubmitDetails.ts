import {SystemInfo} from '../subprocesses/SystemInfo'

const checkcond = () =>{
    const cond : boolean = (<HTMLInputElement>document.getElementById('termscheck')).checked;
    const button : any = (<HTMLInputElement>document.getElementById('finish'));
    if(cond === true){
        button.disabled = false;
    }
    else{
        button.disabled = true;
    }
} 

const saveDetails = () => {
    const sd : any = new SystemInfo();
    sd.extractDetails();
}

const finishEle : any = document.getElementById('finish');
finishEle.onclick = () =>{
    saveDetails()
}

const check : any = document.getElementById('termscheck');
check.onclick = () => {
    checkcond()
}