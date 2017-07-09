// 標準
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var AppBase = require('./appbase.js');

class ExpressAppBase extends AppBase {

  constructor() {
    super();

    var app = express();

    // ejsを使用するための設定
    app.set('views', process.cwd() + '/app/views');
    app.set('view engine', 'ejs');

    // POSTパラメータを扱うため
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    // 静的ファイル
    app.use(express.static('public'));

    this.app = app;
    this.http = http.Server(app);
    this.port = this.config.port;
  }

  // アプリケーション実行
  run() {
    this.http.listen(this.port, function(){
      console.log('listening on *:' + this.port);
    });
  }
}

module.exports = ExpressAppBase;
