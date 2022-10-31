export abstract class PromiseLogic {
  protected abstract databaseService;
  promiseGet<T>(sql) {
    return new Promise<T>((resolve, reject) => {
      this.databaseService.getExectQuery(sql, (err, res, ...arg) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
  promiseOthers<T>(sql) {
    return new Promise<T>((resolve, reject) => {
      this.databaseService.exectQuery(sql, (err, res, ...arg) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
