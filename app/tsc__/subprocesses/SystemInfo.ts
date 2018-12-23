import {getStaticData, version,cpu} from 'systeminformation';
import {DBService} from '../dbService';
export class SystemInfo{

    public details : any;

    constructor(){
        this.details  = [];
    }

    /**
     * Reference : https://www.npmjs.com/package/systeminformation#reference
     */

    public extractDetails(){
        var getDetails ;
        getStaticData()
            .then(data =>{
                console.log(data);
                getDetails = data;
                this.details = getDetails;
                this.insertData();
            })
    }

    public insertData(){
        var IData = new DBService('../store/SystemInfoFile')
        console.log(this.details)
        IData.save('/info', this.details)
    }
}

