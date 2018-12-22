const db = require('../app/src/dbService');
const shelljs = require('shelljs');

function DatabaseServiceTest() {
    var database = new db.DBService("testDatabase"),
        first = "check1",
        second = ["ch", "eck1"],
        third = {"ch": "eck1"};

    database.save("/first", first);
    database.save("/second", second);
    database.save("/third", third);

    var res1 = database.getStore("/first"),
        res2 = database.getStore("/second"),
        res3 = database.getStore("/third");
    if (res1 === first && res2 === second && res3 === third) {
        console.warn("Database Working correctly");
    } else {
        console.warn("Database not working correctly.");
        shelljs.exit(1);
    }
}

exports.DatabaseServiceTest = DatabaseServiceTest;