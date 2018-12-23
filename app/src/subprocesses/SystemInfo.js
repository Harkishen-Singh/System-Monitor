"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const systeminformation_1 = require("systeminformation");
const dbService_1 = require("../dbService");
class SystemInfo {
    constructor() {
        this.details = [];
    }
    /**
     * Reference : https://www.npmjs.com/package/systeminformation#reference
     */
    extractDetails() {
        var getDetails;
        systeminformation_1.getStaticData()
            .then(data => {
            console.log(data);
            getDetails = data;
            this.details = getDetails;
            this.insertData();
        });
    }
    insertData() {
        var IData = new dbService_1.DBService('../store/SystemInfoFile');
        console.log(this.details);
        IData.save('/info', this.details);
    }
}
exports.SystemInfo = SystemInfo;
