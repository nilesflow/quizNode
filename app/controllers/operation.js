var Socket = require(process.cwd() + '/app/modules/socket.js');

const Base = require('./base.js');

exports.create = function() {
  return new Operation();
}

class Operation extends Base {

  constructor() {
    super();
    this.socket = Socket.getInstance();
  }

  index(req, res) {
    var self = this;
    self.res = res;

    self.mQuestions.findOne(req.params.id, function(question = {}){
      self.question = question;
      self._view();
    });
  }

  // 画面表示
  _view() {
    this.res.render('operation', {
      question : this.question,
      back : true,
    });
  }

  // 各卓、スクリーン画面切り替え
  display(req, res) {
    this.socket.display(req.params.id);
  }

  // 問題開始：残り時間カウント
  start(req, res) {
    this.socket.start(req.params.id);
  }

  // 問題開始：残り時間カウント
  stop(req, res) {
    this.socket.stop(req.params.id);
  }

  // 答え合わせ
  answer(req, res) {
    var self = this;

    // クイズ終了後でなければ受け付けない
    if (this.socket.inRemain()) {
      res.status(400).send({'message': 'クイズ終了後に操作してください。'});
      return;
    }

    // DBから回答情報を取得
    self.questions.findOne(req.params.id, function(question){
      console.log(question);

      // 回答情報を付与して、各画面へ
      var data = {
        answer : question.answer,
      };
      self.socket.answer(data);
      res.send('OK');
    });
  }
}
