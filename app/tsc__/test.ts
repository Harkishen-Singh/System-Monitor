import JsonDB from 'node-json-db';

var db = new JsonDB('./store/system-monitor-general', true, true);

db.push('/test2', "workingNow2", true);