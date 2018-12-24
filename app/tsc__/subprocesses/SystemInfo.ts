import { cpu, getStaticData, version } from 'systeminformation';
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
        let getDetails: any;
        const self: this = this;
        getStaticData()
            .then((data: any) => {
                getDetails = data;
                self.details = getDetails;
                self.insertData();
            })
    }

    public insertData(){
        const IData = new DBService('../store/SystemInfoFile')
        IData.saveObject('/SystemDetails', this.details)
    }
}
