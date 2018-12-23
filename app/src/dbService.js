"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = __importDefault(require("node-json-db"));
class DBService {
    constructor(databaseName) {
        this.information = "";
        this.database = new node_json_db_1.default(databaseName.toString());
    }
    reload() {
        this.database.reload();
    }
    save(address, data) {
        this.database.push(address, data, true);
    }
    saveArr(address, data) {
        this.database.push(address, data, true);
    }
    saveObject(address, data) {
        this.database.push(address, data, true);
    }
    getStore(address) {
        return this.database.getData(address);
    }
    deleteStore(address) {
        this.database.delete(address);
    }
}
exports.DBService = DBService;
