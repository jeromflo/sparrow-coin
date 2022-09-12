import { ConnectionMysqlService } from './model-database/connection-mysql/connection-mysql.service';
const db = ConnectionMysqlService.createInstance();
console.log(db);

/* db.then(console.log); */
