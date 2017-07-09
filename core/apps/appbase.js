var fs = require('fs');

class AppBase {

  constructor() {
    // コンフィグ
    var jsonConfig = fs.readFileSync('config.json');
    this.config = JSON.parse(jsonConfig);
  }

}

module.exports = AppBase;
