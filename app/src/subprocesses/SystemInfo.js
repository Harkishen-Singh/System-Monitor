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
        let getDetails;
        const self = this;
        systeminformation_1.getStaticData()
            .then((data) => {
            getDetails = data;
            self.details = getDetails;
            self.insertData();
        });
    }
    insertData() {
        const IData = new dbService_1.DBService("../store/SystemInfoFile");
        IData.saveObject("/SystemDetails", this.details);
    }
}
exports.SystemInfo = SystemInfo;
