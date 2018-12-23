import {getStaticData, version,cpu} from 'systeminformation';
import {DBService} from '../dbService';
class SystemInfo{

    public details : any;

    constructor(){
        this.details  = [];
    }

    /**
     * Reference : https://www.npmjs.com/package/systeminformation#reference
     */

    public extractDetails(){
        var getDetails ;
        var self = this;
        getStaticData()
            .then(function(data){
                getDetails = data;
                self.details = getDetails;
                self.insertData();
            })
    }

    public insertData(){
        var IData = new DBService('../store/SystemInfoFile')
        IData.save('/info', this.details)
    }
}

exports.SystemInfo = SystemInfo;