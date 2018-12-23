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
        var self = this;
        systeminformation_1.getStaticData()
            .then(function (data) {
            getDetails = data;
            self.details = getDetails;
            self.insertData();
        });
    }
    insertData() {
        var IData = new dbService_1.DBService('../store/SystemInfoFile');
        IData.save('/info', this.details);
    }
}
exports.SystemInfo = SystemInfo;
