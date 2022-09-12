"use strict";
exports.__esModule = true;
var connection_mysql_service_1 = require("./model-database/connection-mysql/connection-mysql.service");
var db = connection_mysql_service_1.ConnectionMysqlService.createInstance();
console.log(db);
/* db.then(console.log); */
