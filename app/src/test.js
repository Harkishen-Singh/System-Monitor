"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = __importDefault(require("node-json-db"));
var db = new node_json_db_1.default('./store/system-monitor-general', true, true);
db.push('/test2', "workingNow2", true);
