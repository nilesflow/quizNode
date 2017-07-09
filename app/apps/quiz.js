var cwd = process.cwd();
var ExpressAppBase = require(cwd + '/core/apps/expressappbase.js');
var Mongo = require(cwd + '/core/modules/mongo.js');
var Socket = require(cwd + '/app/modules/socket.js');

exports.create = function() {
  return new Quiz();
};

class Quiz extends ExpressAppBase {

  constructor() {
    super();

    // PRJ内lib
    var mongo = Mongo.create(this.config.db);
    var socket = Socket.create(this.http, {
      remain : this.config.secRemain,
    });
    this.mongo = mongo;

    var app = this.app;

    // ejs のオブジェクトコピー
    app.locals.view = Object.assign({}, this.config.view);
    app.locals.remain = this.config.secRemain;

    // ルート設定
    var vote      = require(cwd + '/app/controllers/vote.js').create();
    var admin     = require(cwd + '/app/controllers/admin.js').create();
    var screen    = require(cwd + '/app/controllers/screen.js').create();
    var seats     = require(cwd + '/app/controllers/seats.js').create();
    var seat      = require(cwd + '/app/controllers/seat.js').create();
    var questions = require(cwd + '/app/controllers/questions.js').create();
    var question  = require(cwd + '/app/controllers/question.js').create();
    var control   = require(cwd + '/app/controllers/control.js').create();
    var operation = require(cwd + '/app/controllers/operation.js').create();
    var urls      = require(cwd + '/app/controllers/urls.js').create();

    /*
     * ゲスト向け
     */
    app.get('/vote/', vote.index.bind(vote));
    app.get('/vote/:id', vote.index.bind(vote));

    /*
     * 管理者向け
     */
    app.get('/admin', admin.index.bind(admin));

    // スクリーン表示
    app.get('/screen', screen.index.bind(screen));
    app.get('/screen/:id', screen.index.bind(screen));

    // 卓席管理
    app.get('/seats', seats.index.bind(seats));
    app.get('/seat/:id', seat.index.bind(seat));
    app.post('/seat/:id/regist', seat.regist.bind(seat));
    app.post('/seat/:id/remove', seat.remove.bind(seat));

    // 問題管理
    app.get('/questions', questions.index.bind(questions));
    app.get('/question/:id', question.index.bind(question));
    app.post('/question/:id/regist', question.regist.bind(question));
    app.post('/question/:id/remove', question.remove.bind(question));

    /* 
     * 問題操作
     */
    // 一覧
    app.get('/control', control.index.bind(control));

    // 個々問題
    app.get('/operation/:id', operation.index.bind(operation));
    app.post('/operation/:id/display', operation.display.bind(operation));
    app.post('/operation/:id/start', operation.start.bind(operation));
    app.post('/operation/:id/stop', operation.stop.bind(operation));
    app.post('/operation/:id/answer', operation.answer.bind(operation));

    // URL管理
    app.get('/urls', urls.index.bind(urls));
  }

  run() {
    // モジュールの準備後、HTTPサーバ起動
    this.mongo.on('ready', this.onReadyMongo.bind(this));
    this.mongo.open();
  }

  onReadyMongo() {
    super.run();
  }
}
