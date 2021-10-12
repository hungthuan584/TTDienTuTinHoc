const mysql = require('mysql');

//create mysql connection

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ttdientutinhoc'
});

var del = dbCon._protocol._delegateError;
dbCon._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace('fatal error 123: ' + err.message);
    }
    return del.call(this, err, sequence);
};

dbCon.connect();

module.exports = dbCon;