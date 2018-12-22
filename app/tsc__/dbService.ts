import JsonDB from 'node-json-db';

export class DBService {

    private information: string;
    private database: JsonDB;

    constructor(databaseName: string) {
        this.information = "";
        this.database = new JsonDB('./store'+databaseName.toString());
    }

    public reload() {
        this.database.reload();
    }

    public save(address: string, data: any) {
        this.database.push(address, data, true);
    }

    public saveArr(address: string, data: any[]) {
        this.database.push(address, data, true);
    }

    public saveObject(address: string, data: object) {
        this.database.push(address, data, true);
    }

    public getStore(address: string) {
        return this.database.getData(address);
    }

    public deleteStore(address: string) {
        this.database.delete(address);
    }
}